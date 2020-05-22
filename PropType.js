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
			var wrong = Wrong('must_have_type_in_prop', { description: 'Type mismatch in specific property in object' })

			wrong.detail =
			{
				prop: name,
				value: value[name],
				expected: type,
			}

			return wrong
		})
	})
}
