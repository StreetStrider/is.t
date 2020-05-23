/* @primitive */

import Contract from './Contract'

const code = 'must_be_exact_value'


export default function Literal (value_literal)
{
	return Contract('Literal', value =>
	{
		if (value !== value_literal)
		{
			var detail =
			{
				expected: value_literal,
				actual:   value,
			}

			return { code, detail }
		}
	})
}
