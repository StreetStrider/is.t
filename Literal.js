/* @primitive */

import Contract from './Contract'

const code = 'must_be_exact_value'
const description = 'Literal value expected'


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

			return { code, description, detail }
		}
	})
}
