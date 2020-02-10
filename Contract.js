
import Name from 'function-name'

import Wrong from './Wrong'


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

		if (Wrong.is(evr))
		{
			return evr
		}

		if (evr instanceof Error)
		{
			var wrong = Wrong('bare_error', 'Bare Error occured due Contract checking')
			wrong.due = evr
		}
		else if (typeof evr === 'string')
		{
			var wrong = Wrong(evr)
		}
		else
		{
			var wrong = Wrong('unknown_violation', 'Unknown object occured due Contract checking')
			wrong.due = evr
		}

		wrong.contract = contract

		return wrong
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
