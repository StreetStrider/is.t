/* @composite */

import check from '../check'
import ack from './_/ack'

import Prop     from './Prop'
import Contract from './Contract'

const code = 'must_have_type_in_prop'
const description = 'Type mismatch in specific property in object'


export default function PropType (name, type)
{
	var prop = Prop(name)
	type = ack(type)

	return Contract('PropType', value =>
	{
		check(prop, value)
		check.sub(type, value[name], () =>
		{
			var detail =
			{
				prop: name,
				expected: value[name],
				expected: type,
			}

			return { code, description, detail }
		})
	})
}
