/* @primitive */

import Contract from './Contract'

const code = 'must_contain_prop'


export default function Prop (name)
{
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
