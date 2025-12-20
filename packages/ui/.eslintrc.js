module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-restricted-imports': [
			'warn',
			{
				patterns: [
					{
						group: ['@mui/material/*', '@mui/system/*'],
						message: 'Use @multi-bu/ui components instead of direct MUI imports. This helps maintain governance.',
					},
				],
			},
		],
	},
};
