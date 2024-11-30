import globals from 'globals';
import pluginReact from 'eslint-plugin-react';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['**/*.{js,mjs,cjs,jsx}']},
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginReact.configs.flat.recommended, // Apply recommended React config first
    {
        rules: {
            'indent': ['error', 4, {
                SwitchCase: 1,
                FunctionDeclaration: { parameters: 1, body: 1 },
                FunctionExpression: { parameters: 1, body: 1 },
            }],
            'quotes': ['error', 'single', { avoidEscape: true }], // Re-declare quotes rule
        },
    },
];
