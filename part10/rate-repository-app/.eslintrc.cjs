module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-env', '@babel/preset-react'],
		},
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	globals: {
		__DEV__: 'readonly',
		navigator: 'readonly',
	},
	plugins: ['react', 'react-native', 'jest'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jest/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
	},
};
