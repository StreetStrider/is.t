
import Contract from './Contract'


export var String = Contract('String', value =>
{
	if (typeof value !== 'string')
	{
		return 'must_be_string'
	}

	return true
})


export default new Map(
[
	// [ global.Boolean, Boolean ],
	// [ global.Number, Number ],
	[ global.String, String ],

	// [ global.Null, Null ],
])
