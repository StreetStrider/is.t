
import check from '../check'

import Contract from './Contract'

const code = 'must_instanceof'
const description = 'Value must be an instance of specific prototype'

export default function Instance (constructor)
{
	check.as('constructor', Function, constructor)

	return Contract('Typeof', value =>
	{
		if (! (value instanceof constructor))
		{
			var detail = { constructor }
			return { code, description, detail }
		}
	})
}
