module.exports = {
	env: {
		'es6': true,
		node: true,
		commonjs: true,
	},
	'parser': 'babel-eslint',
	//extends: ['eslint:recommended'],
	'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
            'modules': true
        }
    },
	ignorePatterns: ['./node_modules/', './.vscode/*', './logs/', './.git/*'],
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-mixed-spaces-and-tabs': 'error',
		//'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none'}]
	},
};

