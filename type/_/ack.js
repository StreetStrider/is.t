
import Contract  from '../Contract'
import Condition from '../Condition'
import Literal   from '../Literal'

import builtin   from './builtin'


export default function ack (contract)
{
	if (Contract.is(contract))
	{
		return contract
	}
	else if (builtin.has(contract))
	{
		return builtin.get(contract)
	}
	// TODO: instanceof globals
	else if (typeof contract === 'function')
	{
		var name = contract.name
		if (name)
		{
			var description = `Function ${ name } must be met`
		}
		return Condition(contract, description)
	}
	else
	{
		return Literal(contract)
	}
}


export function acks (contracts)
{
	return contracts.map(ack)
}
