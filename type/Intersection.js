/* @composite */

import check from '../check.js'
import Contract from './Contract.js'

const code = 'must_be_intersection_of'
const description = 'Type mismatch with the some of contracts'


export default function Intersection (...contracts)
{
	return Contract('Intersection', (value) =>
	{
		var violations = []

		for (const C of contracts)
		{
			try
			{
				check(C, value)
			}
			catch (wrong)
			{
				violations.push(wrong)
			}
		}

		if (violations.length)
		{
			var detail = { violations }
			var cause = violations[0]

			return { code, description, detail, cause }
		}
	})
}
