/* @composite */

import check from '../check'

import Prop     from './Prop'
import Contract from './Contract'

const code = 'must_have_type_in_prop'
const description = 'Type mismatch in specific property in object'


export default function PropType (name, type)
{
	var prop = Prop(name)
	type = check(type)

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
