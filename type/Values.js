/* @composite */

import Contract from './Contract'

import Length from './Length'

const code = 'must_have_values'
const description = 'One or more elements expected'


export default Contract('Values', value =>
{
	Length(value)

	if (value.length <= 0)
	{
		return { code, description }
	}
})
