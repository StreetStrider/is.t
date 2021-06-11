/* @primitive */

import check    from '../check'
import Iterable from './Iterable'
import Contract from './Contract'

const code = 'must_be_one_of'
const description = 'One of specific values expected'


export default function Enum (seq)
{
	check.as('seq', Iterable, seq)

	var whitelist = new Set(seq)
	var allowed   = Object.freeze([ ...seq ])

	return Contract('Enum', value =>
	{
		if (! whitelist.has(value))
		{
			var detail = { allowed }

			return { code, description, detail }
		}
	})
}
