/* @composite */

import Contract from './Contract'
import check from '../check'


export default function Compose (name, ...contracts)
{
	check(String, name)

	if (! contracts.length)
	{
		return Contract(name, () => {})
	}
	if (contracts.length === 1)
	{
		var contract = contracts[0]
		check.as('contracts/0', Function, contract)

		return Contract(name, contract)
	}

	contracts = prep_contracts(contracts)

	return Contract(name, (value) =>
	{
		for (const C of contracts)
		{
			check(C, value)
		}
	})
}


export function prep_contracts (contracts)
{
	// TODO: ack, or check.as
	return contracts.map((contract, index) =>
	{
		var name = ('contracts/' + index)
		check.as(name, Function, contract)

		if (Contract.is(contract))
		{
			return contract
		}

		return Contract(name, contract)
	})
}
