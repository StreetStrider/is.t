/* @primitive */

import Contract from '../Contract'


export var Boolean = Contract('Boolean', value =>
{
	if (typeof value !== 'boolean')
	{
		return 'must_be_boolean'
	}
})

export var Number = Contract('Number', value =>
{
	if (typeof value !== 'number')
	{
		return 'must_be_number'
	}
})

export var String = Contract('String', value =>
{
	if (typeof value !== 'string')
	{
		return 'must_be_string'
	}
})

export var Symbol = Contract('Symbol', value =>
{
	if (typeof value !== 'symbol')
	{
		return 'must_be_symbol'
	}
})


export var Object = Contract('Object', value =>
{
	if (value !== global.Object(value))
	{
		return 'must_be_object'
	}
})

export var Array = Contract('Array', value =>
{
	if (! global.Array.isArray(value))
	{
		return 'must_be_array'
	}
})

export var Function = Contract('Function', value =>
{
	if (typeof value !== 'function')
	{
		return 'must_be_function'
	}
})


export default new Map(
[
	[ global.Boolean, Boolean ],
	[ global.Number,  Number ],
	[ global.String,  String ],
	[ global.Symbol,  Symbol ],
	[ global.Object, Object ],
	[ global.Array,  Array ],
	[ global.Function, Function ],
])

// function Instance ()
// {
// TODO: instanceof globals
// }

// Error
// TypeError
// Wrong

// Date
// RegExp
// Map
// Set

// Promise
