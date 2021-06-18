/* @composite */

import check from '../check'
import Contract from './Contract'

const code = 'must_be_union_of'
const description = 'Type mismatch with the some of contracts'


export default function Union (...contracts)
{
	return Contract('Union', (value) =>
	{
		var violations = []

		for (const C of contracts)
		{
			try
			{
				check(C, value)

				return
			}
			catch (wrong)
			{
				violations.push(wrong)
			}
		}

		var detail = { violations }
		var cause = violations[0]

		return { code, description, detail, cause }
	})
}
