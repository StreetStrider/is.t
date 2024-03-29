/* @primitive */

import Contract from '../Contract'
import W from '../../Wrong'


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


export var Date = Contract('Date', value =>
{
	if (! (value instanceof global.Date))
	{
		return 'must_be_date'
	}
})

export var RegExp = Contract('RegExp', value =>
{
	if (! (value instanceof global.RegExp))
	{
		return 'must_be_regexp'
	}
})

export var Error = Contract('Error', value =>
{
	if (! (value instanceof global.Error))
	{
		return 'must_be_error'
	}
})

export var Wrong = Contract('Wrong', value =>
{
	if (! W.is(value))
	{
		return 'must_be_wrong'
	}
})

export var Promise = Contract('Promise', value =>
{
	if (value instanceof global.Promise) return
	if (typeof Object(value).then === 'function') return
	return 'must_be_promise'
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
	[ global.Date, Date ],
	[ global.RegExp, RegExp ],
	[ global.Error, Error ],
	[ W, Wrong ],
	[ global.Promise, Promise ],
])
