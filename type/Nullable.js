/* @composite */

import check from '../check.js'
import ack from './_/ack.js'
import Contract from './Contract.js'

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

		check.sub(type, value, () =>
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
