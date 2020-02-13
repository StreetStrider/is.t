
import Contract from './Contract'

import Length from './Length'


export default Contract('Values', value =>
{
	Length(value)

	if (value.length === 0)
	{
		return 'must_have_values'
	}

	return true
})
