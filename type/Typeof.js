
import check from '../check.js'

import Contract from './Contract.js'

const code = 'must_typeof'
const description = 'Value typeof must be a specific value'

export default function Typeof (type)
{
	check.as('type', String, type)

	return Contract('Typeof', value =>
	{
		var actual = (typeof value)
		var expected = type

		if (actual !== expected)
		{
			var detail = { expected, actual }
			return { code, description, detail }
		}
	})
}
