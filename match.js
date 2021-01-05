/* eslint complexity: [ 2, 9 ] */

import Wrong from './Wrong'
import is_object from './is-object'


export default function match (predicate, error)
{
	switch (arguments.length)
	{
	case 0:  return match
	case 1:  return (error) => test(predicate, error)
	default: return test(predicate, error)
	}
}

function test (predicate, error)
{
	if (Wrong.is(error))
	{
		var string_value = error.code
	}
	else if (error instanceof Error)
	{
		var string_value = error.message
	}
	else
	{
		var string_value = error
	}

	if (typeof predicate === 'string')
	{
		return (predicate === string_value)
	}
	else if (predicate instanceof RegExp)
	{
		if (typeof string_value === 'string')
		{
			return predicate.test(string_value)
		}

		return false
	}
	else if (typeof predicate === 'function')
	{
		return Boolean(predicate(error))
	}
	else if (is_object(predicate) && is_object(error))
	{
		return test_object(predicate, error)
	}
	else
	{
		return (predicate === error)
	}
}

function test_object (predicate, error)
{
	for (var key in predicate)
	{
		if (! (key in error))
		{
			return false
		}

		var pred  = predicate[key]
		var value = error[key]

		if (! test_value(pred, value))
		{
			return false
		}
	}

	return true
}

function test_value (predicate, value)
{
	if (typeof predicate === 'function')
	{
		return Boolean(predicate(value))
	}
	else if (predicate instanceof RegExp)
	{
		if (typeof value !== 'string')
		{
			return false
		}
		else
		{
			return predicate.test(value)
		}
	}
	else if (is_object(predicate) && is_object(value))
	{
		return test_object(predicate, value)
	}
	else
	{
		return (predicate === value)
	}
}
