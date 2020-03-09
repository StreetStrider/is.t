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
			var wrong = Wrong('must_have_same_length', 'Tuple of another length passed')

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

			try
			{
				check(C, value[n])
			}
			catch (following)
			{
				let wrong = Wrong('must_have_type_at_pos', 'Type mismatch at specific position in tuple')

				wrong.detail = { pos: n }
				wrong.cause  = following

				throw wrong
			}
		}
	})
}
