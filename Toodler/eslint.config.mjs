import globals from 'globals';
import pluginReact from 'eslint-plugin-react';


/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['**/*.{js,mjs,cjs,jsx}']},
    {settings: {
        react: {
            version: 'detect',
        },
    },
    },
  
    {languageOptions: { globals: globals.browser }},
    {
        rules: {
            'indent': ['error', 4, {
                SwitchCase: 1, // Indent switch cases by one level
                FunctionDeclaration: {
                    parameters: 1, // Indent function parameters by 1 level
                    body: 1, // Indent function body by 1 extra level
                },
                FunctionExpression: {
                    parameters: 1, // Indent function parameters by 1 level
                    body: 1, // Indent function body by 1 extra level
                },
            }],
            'quotes': ['error', 'single', {avoidEscape: true}],
        },
    },
    pluginReact.configs.flat.recommended,
];