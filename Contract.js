
import Name from 'function-name'

import Wrong from './Wrong'

var trait = Symbol('Contract')


export default function Contract (name, fn)
{
	function validate (value)
	{
		var evr = check(value)

		if (true === evr) { return value }

		Error.captureStackTrace(evr, validate)

		throw evr
	}


	function cast (value, value_fallback)
	{
		validate(value_fallback)

		if (is(value))
		{
			return value
		}
		else
		{
			return value_fallback
		}
	}


	function is (value)
	{
		return (true === check(value))
	}


	function check (value)
	{
		var evr = fn(value)

		if (true === evr)
		{
			return true
		}

		if (Wrong.is(evr))
		{
			return evr
		}

		if (evr instanceof Error)
		{
			var wrong = Wrong('bare_error', 'Bare Error occured while Contract checking')
			wrong.cause = evr
		}
		else if (typeof evr === 'string')
		{
			var wrong = Wrong(evr)
		}
		else
		{
			var wrong = Wrong('unknown_violation', 'Unknown object occured while Contract checking')
			wrong.cause = evr
		}

		wrong.contract = contract

		return wrong
	}


	Name(validate, name)

	/* TODO: consider def-prop */
	var contract = validate

	contract.contract = 'yes'
	contract[trait]   = true

	contract.is    = is
	contract.check = check
	contract.cast  = cast

	return contract
}


Contract.is = (value) =>
{
	return (trait in Object(value))
}
