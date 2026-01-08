#!/usr/bin/env tsx

/**
 * Version bump enforcement script
 *
 * Checks if token files have changed but version files haven't been updated.
 * Fails if token files changed without at least a patch bump.
 */

import { readFile, readdir, stat } from 'fs/promises';
import { join } from 'path';
import { execSync } from 'child_process';

interface VersionInfo {
	version: string;
}

/**
 * Get git diff for a file (checks if file changed)
 */
function getGitDiff(filePath: string): boolean {
	try {
		// Check if file is tracked and has changes
		const result = execSync(`git diff --name-only HEAD`, { encoding: 'utf-8' });
		return result.split('\n').includes(filePath);
	} catch {
		// If git command fails, assume file changed (conservative approach)
		return true;
	}
}


/**
 * Read version file
 */
async function readVersionFile(versionPath: string): Promise<VersionInfo | null> {
	try {
		const content = await readFile(versionPath, 'utf-8');
		return JSON.parse(content);
	} catch {
		return null;
	}
}

/**
 * Parse semver version
 */
function parseVersion(version: string): { major: number; minor: number; patch: number } | null {
	const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
	if (!match) {
		return null;
	}
	return {
		major: parseInt(match[1], 10),
		minor: parseInt(match[2], 10),
		patch: parseInt(match[3], 10),
	};
}

/**
 * Compare versions (returns true if newVersion > oldVersion)
 */
function isVersionBumped(oldVersion: string, newVersion: string): boolean {
	const old = parseVersion(oldVersion);
	const newV = parseVersion(newVersion);

	if (!old || !newV) {
		return false;
	}

	if (newV.major > old.major) return true;
	if (newV.major < old.major) return false;

	if (newV.minor > old.minor) return true;
	if (newV.minor < old.minor) return false;

	return newV.patch > old.patch;
}

/**
 * Check version bump for a BU
 */
async function checkBuVersion(buId: string): Promise<{ valid: boolean; message: string }> {
	const tokensPath = join(process.cwd(), 'tokens', buId, 'tokens.json');
	const versionPath = join(process.cwd(), 'tokens', buId, 'version.json');

	// Check if tokens.json exists
	try {
		await stat(tokensPath);
	} catch {
		return { valid: true, message: `${buId}: No tokens.json found, skipping` };
	}

	// Check if tokens.json has changed
	const tokensChanged = getGitDiff(`tokens/${buId}/tokens.json`);

	if (!tokensChanged) {
		return { valid: true, message: `${buId}: No token changes, version check passed` };
	}

	// Tokens changed, check version file
	const versionInfo = await readVersionFile(versionPath);

	if (!versionInfo) {
		return {
			valid: false,
			message: `${buId}: Tokens changed but no version.json file found. Create tokens/${buId}/version.json with version "1.0.0"`,
		};
	}

	// Try to get old version from git
	try {
		const oldVersionContent = execSync(`git show HEAD:tokens/${buId}/version.json`, {
			encoding: 'utf-8',
			stdio: 'pipe',
		}).trim();
		const oldVersion = JSON.parse(oldVersionContent) as VersionInfo;

		if (!isVersionBumped(oldVersion.version, versionInfo.version)) {
			return {
				valid: false,
				message: `${buId}: Tokens changed but version not bumped (${oldVersion.version} → ${versionInfo.version}). At least a patch bump is required.`,
			};
		}

		return {
			valid: true,
			message: `${buId}: Version bumped correctly (${oldVersion.version} → ${versionInfo.version})`,
		};
	} catch {
		// File is new or not in git, version check passes
		return {
			valid: true,
			message: `${buId}: New tokens file, version check passed`,
		};
	}
}

/**
 * Main function
 */
async function main() {
	const tokensDir = join(process.cwd(), 'tokens');
	const entries = await readdir(tokensDir, { withFileTypes: true });
	const buDirs = entries.filter((e) => e.isDirectory() && e.name !== 'figma');

	const results: Array<{ valid: boolean; message: string }> = [];

	// Check core tokens version
	const coreVersionPath = join(tokensDir, 'version.json');
	const coreTokensPath = join(tokensDir, 'core', 'tokens.json');

	try {
		await stat(coreTokensPath);
		const coreTokensChanged = getGitDiff('tokens/core/tokens.json');

		if (coreTokensChanged) {
			const coreVersion = await readVersionFile(coreVersionPath);
			if (!coreVersion) {
				results.push({
					valid: false,
					message: `core: Tokens changed but no tokens/version.json found. Create tokens/version.json with version "1.0.0"`,
				});
			}
		}
	} catch {
		// Core tokens don't exist, skip
	}

	// Check each BU
	for (const buDir of buDirs) {
		const result = await checkBuVersion(buDir.name);
		results.push(result);
	}

	// Print results
	let allValid = true;
	for (const { valid, message } of results) {
		if (valid) {
			console.log(`✅ ${message}`);
		} else {
			console.error(`❌ ${message}`);
			allValid = false;
		}
	}

	if (!allValid) {
		console.error('');
		console.error('Version bump check failed. Please update version files before committing token changes.');
		process.exit(1);
	}

	console.log('');
	console.log('✅ All version bumps are valid');
}

main().catch((error) => {
	console.error('Fatal error:', error);
	process.exit(1);
});

