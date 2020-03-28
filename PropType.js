/* @composite */

import Prop     from './Prop'
import Contract from './Contract'
import check    from './check'
import Wrong    from './Wrong'


export default function PropType (name, type)
{
	var prop = Prop(name)

	return Contract('PropType', value =>
	{
		check(prop, value)
		check.cause(type, value[name], () =>
		{
			var wrong = Wrong('violate_type')

			wrong.detail =
			{
				prop: name,
				value: value[name],
				type,
			}

			return wrong
		})
	})
}
