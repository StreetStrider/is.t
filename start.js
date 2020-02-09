

function concat (glue, seq)
{
	Iterable(seq)

	return [ ...seq ].join(glue)
}


var Iterable = Contract(value =>
{
	if (! is_iterable(value))
	{
		return 'must_be_iterable'
	}

	return true
})

function is_iterable (value)
{
	return (typeof Object(value)[Symbol.iterator] === 'function')
}


test(() => concat('/', [ 'a', 'b', 'c' ]))
test(() => concat('/', new Set([ 'a', 'b', 'c' ])))
test(() => concat('/', {}))


//
function Contract (contract)
{
	function check (value)
	{
		var evr = contract(value)

		if (true === evr)
		{
			return true
		}

		if (evr instanceof Error)
		{
			return evr
		}

		if (typeof evr === 'string')
		{
			return new TypeError(evr)
		}

		return new TypeError
	}

	function test (value)
	{
		return (true === check(value))
	}

	function validate (value)
	{
		var evr = check(value)

		if (true !== evr) { throw evr }

		return value
	}

	return validate
}


function test (fn)
{
	try
	{
		var r = fn()
	}
	catch (e)
	{
		console.error(e)
		return
	}
	{
		console.log(r)
	}
}
