/* @composite */

import Contract from './Contract.js'

import Length from './Length.js'

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
