/* @primitive */

import Contract from './Contract.js'

const code = 'must_met_condition'


export default function Condition (fn, description = 'Condition must be met')
{
	return Contract('Condition', value =>
	{
		if (! fn(value))
		{
			var detail = { fn, value }

			return { code, description, detail }
		}
	})
}
