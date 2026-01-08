import { z } from 'zod';

/**
 * DTCG (Design Tokens Community Group) Token Schema
 * 
 * This schema follows the DTCG 1.0 specification, which is the standard format
 * that Figma expects for design tokens. Each token has:
 * - $value: The actual token value
 * - $type: The token type (color, dimension, fontFamily, etc.)
 * - $description: Optional description
 * 
 * Structure organized into logical groups:
 * - color: Color tokens (palette colors)
 * - typography: Typography tokens (fontFamily, fontSize, fontWeight, lineHeight)
 * - spacing: Spacing tokens (dimensions)
 * - shape: Shape tokens (borderRadius, elevation)
 * - semantic: Semantic token mappings (references to color tokens)
 */

// DTCG token value schema - a token can have $value, $type, $description
const dtcgTokenValueSchema = z.object({
	$value: z.any(), // Value can be string, number, or object
	$type: z.string().optional(), // Type is optional but recommended
	$description: z.string().optional(),
});

// DTCG token can be either a token object or a nested group
const dtcgTokenOrGroup = z.union([
	dtcgTokenValueSchema,
	z.record(z.string(), z.any()), // Nested groups
]);

// Color tokens - organized by category (primary, secondary, neutral, etc.)
const colorGroupSchema = z.record(z.string(), dtcgTokenOrGroup);

// Typography tokens
const typographyGroupSchema = z.object({
	fontFamily: z.record(z.string(), dtcgTokenOrGroup).optional(),
	fontSize: z.record(z.string(), dtcgTokenOrGroup).optional(),
	fontWeight: z.record(z.string(), dtcgTokenOrGroup).optional(),
	lineHeight: z.record(z.string(), dtcgTokenOrGroup).optional(),
});

// Spacing tokens - record of dimension tokens
const spacingGroupSchema = z.record(z.string(), dtcgTokenOrGroup);

// Shape tokens
const shapeGroupSchema = z.object({
	borderRadius: z.record(z.string(), dtcgTokenOrGroup).optional(),
	elevation: z.record(z.string(), dtcgTokenOrGroup).optional(),
});

// Semantic tokens - can reference color tokens using {color.primary.500} syntax
const semanticGroupSchema = z.object({
	surface: z.record(z.string(), dtcgTokenOrGroup).optional(),
	text: z.record(z.string(), dtcgTokenOrGroup).optional(),
	border: z.record(z.string(), dtcgTokenOrGroup).optional(),
	action: z.record(z.string(), dtcgTokenOrGroup).optional(),
	feedback: z.record(z.string(), dtcgTokenOrGroup).optional(),
});

// Complete DTCG token schema
const dtcgTokenSchema = z.object({
	$schema: z.string().optional(), // Optional schema reference
	color: colorGroupSchema.optional(),
	typography: typographyGroupSchema.optional(),
	spacing: spacingGroupSchema.optional(),
	shape: shapeGroupSchema.optional(),
	semantic: semanticGroupSchema.optional(),
});

export type DTCGTokenSchema = z.infer<typeof dtcgTokenSchema>;

// Export schema for validation
export { dtcgTokenSchema };

// Legacy types for backward compatibility during migration
// These will be removed once migration is complete
export type TokenSchema = DTCGTokenSchema;
export type BaseTokens = any; // Deprecated
export type SemanticTokens = any; // Deprecated
export type PaletteTokens = any; // Deprecated
export type TypographyTokens = any; // Deprecated
export type SpacingTokens = any; // Deprecated
export type ShapeTokens = any; // Deprecated
