
var outlander = require('outlander/node')
var globals = require('outlander/globals')


module.exports =
[
	...outlander,
	{
		languageOptions:
		{
			globals:
			{
				...globals.node,
			}
		}
	},
	{
		rules:
		{
			'node/no-unpublished-import': 0,
			'node/no-unpublished-require': 0,
		},
	},
	{
		files: [ '**/*.js' ],
	},
	{
		ignores: [ 'example/' ],
	},
]
