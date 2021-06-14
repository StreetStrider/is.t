/* @composite */

import check from '../check'
import ack from '../ack'
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
		return ack(contracts[0])
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
