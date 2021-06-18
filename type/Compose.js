/* @composite */

import check from '../check'
import Contract from './Contract'


export default function Compose (name, ...contracts)
{
	check.as('name', String, name)

	if (! contracts.length)
	{
		return Contract(name, () => {})
	}
	if (contracts.length === 1)
	{
		return check(contracts[0])
	}

	return Contract(name, (value) =>
	{
		for (const C of contracts)
		{
			check(C, value)
		}
	})
}
