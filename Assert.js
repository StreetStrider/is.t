/* @primitive */

import Contract from './Contract'
import Wrong    from './Wrong'

export default function Assert (description)
{
	return Contract('Assert', value =>
	{
		if (! value)
		{
			return Wrong('violate_assert', { description })
		}
	})
}
