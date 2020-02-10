
import Contract from './Contract'


export default Contract(value =>
{
	if (! is_iterable(value))
	{
		return 'must_be_iterable'
	}

	return true
})


function is_iterable (value)
{
	return (typeof Object(value)[Symbol.iterator] === 'function')
}
