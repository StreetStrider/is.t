/* @primitive */

import Contract from './Contract.js'


export default Contract('Iterable', value =>
{
	if (! is_iterable(value))
	{
		return 'must_be_iterable'
	}
})


function is_iterable (value)
{
	return (typeof Object(value)[Symbol.iterator] === 'function')
}
