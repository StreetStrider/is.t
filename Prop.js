
import Contract from './Contract'
import check    from './check'
import Wrong    from './Wrong'


export default function Prop (name)
{
	return Contract('Prop', value =>
	{
		check(Object, value)

		if (! (name in value))
		{
			var wrong = Wrong('must_contain_prop')

			wrong.cause = name

			return wrong
		}

		return true
	})
}
