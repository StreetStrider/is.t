
import Contract from './Contract'
import Wrong    from './Wrong'


export default function Prop (name)
{
	return Contract('Prop', value =>
	{
		if (! (name in Object(value)))
		{
			var wrong = Wrong('must_contain_prop')

			wrong.detail = { prop: name }

			return wrong
		}
	})
}
