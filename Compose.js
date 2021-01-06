/* @composite */

import Contract from './Contract'
import check from './check'


export default function Compose (name, ...contracts)
{
	if (! contracts.length)
	{
		return Contract(name, () => {})
	}
	if (contracts.length === 1)
	{
		return Contract(name, contracts[0])
	}

	contracts = contracts.map((contract, index) =>
	{
		var name = `contracts[${ index }]`
		check.as(name, Function, contract)

		if (Contract.is(contract))
		{
			return contract
		}

		return Contract(name, contract)
	})

	return Contract(name, (value) =>
	{
		for (const C of contracts)
		{
			check(C, value)
		}
	})
}
