
import Contract  from './Contract'
import builtin   from './builtin'
import Condition from './Condition'
import Literal   from './Literal'


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
