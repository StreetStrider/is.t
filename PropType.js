
import Prop     from './Prop'
import Contract from './Contract'
import check    from './check'


export default function PropType (name, type)
{
	var prop = Prop(name)

	return Contract('PropType', value =>
	{
		check(prop, value)
		check(type, value[name])
	})
}
