
import Contract from './Contract'
import Any from './Any'
import check from './check'


export default function Compose (...contracts)
{
	if (! contracts.length)
	{
		return Any
	}
	if (contracts.length === 1)
	{
		return contracts[0]
	}

	return Contract('Compose', (value) =>
	{
		for (const C of contracts)
		{
			check(C, value)
		}

		return true
	})
}
