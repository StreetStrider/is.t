/* @primitive */

import check    from '../check.js'
import Contract from './Contract.js'

const code = 'must_satisfy_assert'


export default function Assert (description = 'Assert is not satisfied')
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
