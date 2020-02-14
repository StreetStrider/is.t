
import Name from 'function-name'

import Wrong from './Wrong'

var trait = Symbol('Contract')

const v0 = void 0


export default function Contract (name, fn)
{
	function check (value)
	{
		var evr = attest(value)

		if (true === evr) { return value }

		Error.captureStackTrace(evr, check)

		throw evr
	}


	function is (value)
	{
		return (true === attest(value))
	}


	function attest (value)
	{
		try
		{
			var evr = fn(value)

			if (evr === v0)
			{
				return true
			}
		}
		catch (e)
		{
			var evr = e
		}

		if (Wrong.is(evr))
		{
			var wrong = evr
		}
		else if (evr instanceof Error)
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


	Name(check, name)

	/* TODO: consider def-prop */
	var contract = check

	contract.contract = 'yes'
	contract[trait]   = true

	contract.is     = is
	contract.attest = attest

	return contract
}


Contract.is = (value) =>
{
	return (trait in Object(value))
}
