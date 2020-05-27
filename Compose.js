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

	return Contract(name, (value) =>
	{
		for (const C of contracts)
		{
			check(C, value)
		}
	})
}
