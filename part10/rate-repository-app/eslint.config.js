import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';

export default [
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			parser: babelParser,
			globals: {
				__DEV__: 'readonly',
			},
			sourceType: 'module',
		},
		plugins: {
			react: eslintPluginReact,
			'react-native': eslintPluginReactNative,
		},
		extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...js.configs.recommended.rules,
			...eslintPluginReact.configs.recommended.rules,
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
	{
		languageOptions: {
			globals: {
				navigator: 'readonly',
				__DEV__: 'readonly',
			},
		},
		settings: {},
	},
];