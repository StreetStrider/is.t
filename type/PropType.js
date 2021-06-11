/* @composite */

import Prop     from './Prop'
import ack      from '../ack'
import Contract from './Contract'
import check    from '../check'

const code = 'must_have_type_in_prop'
const description = 'Type mismatch in specific property in object'


export default function PropType (name, type)
{
	var prop = Prop(name)
	type = ack(type)

	return Contract('PropType', value =>
	{
		check(prop, value)
		check.cause(type, value[name], () =>
		{
			var detail =
			{
				prop: name,
				value: value[name],
				expected: type,
			}

			return { code, description, detail }
		})
	})
}
