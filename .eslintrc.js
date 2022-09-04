module.exports = {
	env: {
		// browser: true,
		es2021: true,
		node: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		curly: [1, 'all'],
		complexity: [1, 10],
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: ['module', ['parent', 'sibling', 'index']],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],
		// 'import/no-extraneous-dependencies': [
		// 	'error',
		// 	{ devDependencies: ['**/*.(test|spec).ts'] },
		// ],
	},
};
