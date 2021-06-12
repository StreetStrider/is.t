/* @primitive */

import check from '../check'
import Key from './Key'
import Contract from './Contract'

const code = 'must_contain_prop'


export default function Prop (name)
{
	check.as('name', Key, name)

	return Contract('Prop', value =>
	{
		if (! (name in Object(value)))
		{
			var detail =
			{
				prop: name,
			}

			return { code, detail }
		}
	})
}
