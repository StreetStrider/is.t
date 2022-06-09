/* @composite */

import check from '../check'
import ack from './_/ack'
import Contract from './Contract'

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
				actual: value,
				expected: type,
			}

			return { code, description, detail }
		})
	})
}
