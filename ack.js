
import Contract  from './type/Contract'
import Condition from './type/Condition'
import Literal   from './type/Literal'

import builtin   from './type/_/builtin'


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
