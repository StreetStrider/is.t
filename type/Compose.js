/* @composite */

import check from '../check'
import { acks } from '../ack'
import Contract from './Contract'


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

	contracts = acks(contracts)

	return Contract(name, (value) =>
	{
		for (const C of contracts)
		{
			check(C, value)
		}
	})
}