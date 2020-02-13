
import Contract from './Contract'


export default Contract('String', value =>
{
	if (typeof value !== 'string')
	{
		return 'must_be_string'
	}

	return true
})
