
import check    from './check'
import Iterable from './Iterable'
import Contract from './Contract'
import Wrong    from './Wrong'


export default function Enum (seq)
{
	check.as('seq', Iterable, seq)

	var whitelist = new Set(seq)
	var allowed   = Object.freeze([ ...seq ])

	return Contract('Enum', value =>
	{
		if (! whitelist.has(value))
		{
			var wrong = Wrong('must_be_one_of')

			wrong.detail = { allowed }

			return wrong
		}
	})
}
