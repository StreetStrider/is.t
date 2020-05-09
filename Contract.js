
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
			var evaluation = fn(value)

			if (evaluation === v0)
			{
				return
			}
		}
		catch (e)
		{
			var evaluation = e
		}

		/* @mutable */
		var wrong = Wrong.cast(evaluation)

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
