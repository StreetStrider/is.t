/* @composite */

import check    from './check'
import Contract from './Contract'
import Wrong    from './Wrong'


export default function Tuple (tuple)
{
	check.as('tuple', Array, tuple)

	return Contract('Tuple', value =>
	{
		check(Array, value)

		if (value.length !== tuple.length)
		{
			var wrong = Wrong('must_have_same_length', { description: 'Tuple of another length passed' })

			wrong.detail =
			{
				expected: tuple.length,
				actual: value.length,
			}

			return wrong
		}

		var L = tuple.length

		for (let n = 0; (n < L); n++)
		{
			let C = tuple[n]

			check.cause(C, value[n], () =>
			{
				let wrong = Wrong('must_have_type_at_pos', { description: 'Type mismatch at specific position in tuple' })

				wrong.detail =
				{
					pos: n,
					value: value[n],
					expected: C,
				}

				return wrong
			})
		}
	})
}
