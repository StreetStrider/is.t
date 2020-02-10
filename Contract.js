

export default function Contract (fn)
{
	function check (value)
	{
		var evr = fn(value)

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

		if (true === evr) { return value }

		Error.captureStackTrace(evr, validate)

		throw evr
	}

	return validate
}
