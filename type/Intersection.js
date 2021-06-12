/* @composite */

import { acks } from '../ack'
import Contract from './Contract'
import check from '../check'

const code = 'must_be_intersection_of'
const description = 'Type mismatch with the some of contracts'


export default function Intersection (...contracts)
{
	contracts = acks(contracts)
	var of = Object.freeze([ ...contracts ])

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
			var detail = { of, violations }
			var cause = violations[0]

			return { code, description, detail, cause }
		}
	})
}
