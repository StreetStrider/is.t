
import Contract from './Contract'


export var Boolean = Contract('Boolean', value =>
{
	if (typeof value !== 'boolean')
	{
		return 'must_be_boolean'
	}

	return true
})

export var Number = Contract('Number', value =>
{
	if (typeof value !== 'number')
	{
		return 'must_be_number'
	}

	return true
})

export var String = Contract('String', value =>
{
	if (typeof value !== 'string')
	{
		return 'must_be_string'
	}

	return true
})


export var Object = Contract('Object', value =>
{
	if (value !== global.Object(value))
	{
		return 'must_be_object'
	}

	return true
})

export var Array = Contract('Array', value =>
{
	if (! global.Array.isArray(value))
	{
		return 'must_be_array'
	}

	return true
})


export default new Map(
[
	[ global.Boolean, Boolean ],
	[ global.Number,  Number ],
	[ global.String,  String ],

	// [ global.Null, Null ],

	[ global.Object, Object ],
	[ global.Array,  Array ],
])
