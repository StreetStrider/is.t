
import def from 'def-prop'
import val from 'def-prop/val'

import Name from 'function-name'

import Wrong from './Wrong'

const trait = Symbol('Contract')

const v0 = void 0


export default function Contract (name, fn)
{
	var contract = check

	Name(check, name)

	function check (value)
	{
		var wrong = attest(value)

		if (wrong === v0) { return value }

		Error.captureStackTrace(wrong, check)

		throw wrong
	}


	function is (value)
	{
		return (attest(value) === v0)
	}


	function attest (value)
	{
		try
		{
			var evr = fn(value)

			if (evr === v0)
			{
				return
			}
		}
		catch (e)
		{
			var evr = e
		}

		if (Wrong.is(evr))
		{
			/* @mutable */
			var wrong = evr
		}
		else if (evr instanceof Error)
		{
			var wrong = Wrong('bare_error', { description: 'Bare Error occured while Contract checking' })
			wrong.cause = evr
		}
		else if (typeof evr === 'string')
		{
			var wrong = Wrong(evr)
		}
		else
		{
			var wrong = Wrong('unknown_violation', { description: 'Unknown object occured while Contract checking' })
			wrong.cause = evr
		}

		/* @mutable */
		wrong.contract = contract

		return wrong
	}


	def(contract, 'contract', val(true, ':enum'))
	def(contract, trait, val(true))

	def(contract, 'is', val(is))
	def(contract, 'attest', val(attest))

	return contract
}


Contract.is = (value) =>
{
	return (trait in Object(value))
}
