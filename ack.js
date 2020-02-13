
import Contract from './Contract'
import builtin  from './builtin'


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
		return Contract(contract.name, contract)
	}
	else // TODO:
	{
		throw new TypeError
	}
}
