
import Name from 'function-name'


export default function Contract (name, fn)
{
	function validate (value)
	{
		var evr = check(value)

		if (true === evr) { return value }

		Error.captureStackTrace(evr, validate)

		throw evr
	}

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

	function is (value)
	{
		return (true === check(value))
	}


	Name(validate, name)

	/* TODO: consider def-prop */
	var contract = validate

	contract.contract = 'yes'
	contract.check = check
	contract.is    = is

	return contract
}
