/* @primitive */

import check from '../check.js'
import Key from './Key.js'
import Contract from './Contract.js'

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
