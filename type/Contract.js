
import def from 'def-prop'
import val from 'def-prop/val'

import mut_name from 'function-name'

import set_trace from '../_/set-trace.js'

import Wrong from '../Wrong.js'

const trait = Symbol('Contract')


export default function Contract (name, fn)
{
	if (typeof name !== 'string')
	{
		throw Wrong('contract_name_must_be_string')
	}
	if (typeof fn !== 'function')
	{
		throw Wrong('contract_fn_must_be_function')
	}

	function contract (value)
	{
		var wrong = attest(value)

		if (wrong === void 0)
		{
			return value
		}

		/* @mutable */
		wrong = Wrong.cast(wrong)
		set_trace(wrong, contract)
		wrong.contract = contract

		throw wrong
	}

	function is (value)
	{
		return (attest(value) === void 0)
	}

	function attest (value)
	{
		try
		{
			return fn(value)
		}
		catch (error)
		{
			return error
		}
	}

	def(contract, 'contract', val(true, ':enum'))
	def(contract, trait, val(true))
	// constructor = function

	def(contract, 'is', val(is))
	mut_name(contract, name)

	return contract
}


Contract.is = (value) =>
{
	return (trait in Object(value))
}
