
import Contract from './Contract'
import Wrong    from './Wrong'


export default function Literal (value_literal)
{
	return Contract('Literal', value =>
	{
		if (value !== value_literal)
		{
			var wrong = Wrong('must_be_exact_value')

			wrong.cause = value_literal

			return wrong
		}
	})
}
