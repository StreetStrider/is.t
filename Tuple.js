
import Contract from './Contract'
import check from './check'
import Wrong    from './Wrong'


export default function Tuple (tuple)
{
	check.as('tuple', Array, tuple)

	return Contract('Tuple', value =>
	{
		check(Array, value)

		if (value.length !== tuple.length)
		{
			return 'must_have_same_length'
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
				let wrong = Wrong('type_mismatch_at_pos', 'Type mismatch at specific position in tuple')

				wrong.detail = { pos: n }
				wrong.cause  = following

				throw wrong
			}
		}
	})
}
