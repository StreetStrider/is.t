/* @composite */

import ack from '../ack'
import Contract from './Contract'
import check from '../check'

const code = 'must_be_type_or_null'
const description = 'Expected specific type or null or undefined'


export default function Nullable (type)
{
	type = ack(type)

	return Contract('Nullable', value =>
	{
		if (value == null)
		{
			return
		}

		check.cause(type, value, () =>
		{
			var detail =
			{
				expected: type,
			}

			return { code, description, detail }
		})
	})
}
