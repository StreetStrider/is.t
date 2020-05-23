/* @primitive */

import check    from './check'
import Contract from './Contract'

const code = 'violate_assert'


export default function Assert (description)
{
	check.as('description', String, description)

	return Contract('Assert', value =>
	{
		if (! value)
		{
			return { code, description }
		}
	})
}
