/* @composite */

import check    from './check'
import Contract from './Contract'
import ack      from './ack'

const wrong_length =
{
	code: 'must_have_same_length',
	description: 'Tuple of another length passed',
}

const wrong_type =
{
	code: 'must_have_type_at_pos',
	description: 'Type mismatch at specific position in tuple',
}


export default function Tuple (tuple)
{
	check.as('tuple', Array, tuple)

	return Contract('Tuple', value =>
	{
		check(Array, value)

		if (value.length !== tuple.length)
		{
			var detail =
			{
				expected: tuple.length,
				actual:   value.length,
			}
			return { ...wrong_length, detail }
		}

		const L = tuple.length

		for (let n = 0; (n < L); n++)
		{
			const C = ack(tuple[n])

			check.cause(C, value[n], () =>
			{
				var detail =
				{
					pos: n,
					value: value[n],
					expected: C,
				}

				return { ...wrong_type, detail }
			})
		}
	})
}
