/* eslint complexity: [ 2, 6 ] */

import Wrong from './Wrong'
import is_object from './_/is-object'


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
	return test_value(predicate, error)
}

function test_value (predicate, value)
{
	if (typeof predicate === 'string')
	{
		return (predicate === as_string(value))
	}
	if (predicate instanceof RegExp)
	{
		return predicate.test(as_string(value))
	}
	if (is_error_constructor(predicate))
	{
		if (value instanceof predicate) return true
	}
	/*if (typeof predicate === 'function')
	{
		return Boolean(predicate(value))
	}*/
	if (is_object(predicate) && is_object(value))
	{
		if (test_object(predicate, value)) return true
	}

	return (predicate === value)
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

function as_string (error)
{
	if (Wrong.is(error))
	{
		return error.code
	}
	else if (error instanceof Error)
	{
		return error.message
	}
	else
	{
		return String(error)
	}
}

function is_error_constructor (constructor)
{
	if (constructor.prototype === Error.prototype) return true
	if (constructor.prototype instanceof Error) return true
	return false
}
