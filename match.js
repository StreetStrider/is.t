/* eslint complexity: [ 2, 7 ] */

import Wrong from './Wrong'
import is_object from './is-object'
import check from './check'


export function match (predicate, error)
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
	error = Wrong.cast(error)

	if (typeof predicate === 'string')
	{
		return (error.code === predicate)
	}
	else if (typeof predicate === 'function')
	{
		return Boolean(predicate(error))
	}
	else if (predicate instanceof RegExp)
	{
		if (typeof error.code !== 'string')
		{
			return false
		}
		else
		{
			return predicate.test(error.code)
		}
	}
	else if (is_object(predicate) && is_object(error))
	{
		return test_as_wrong(predicate, error)
	}
	else
	{
		return (predicate === error)
	}
}

function test_as_wrong (predicate, error)
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

function test_object (pattern, target)
{
	for (var key in pattern)
	{
		if (! (key in target))
		{
			return false
		}
		if (! test_value(pattern[key], target[key]))
		{
			return false
		}
	}

	return true
}


export function handle (predicate, handler_fn)
{
	check.as('handler_fn', Function, handler_fn)

	var mexp = match(predicate)

	return (error) =>
	{
		if (mexp(error))
		{
			return handler_fn(error)
		}
		else
		{
			throw error
		}
	}
}

export function multiple (...handlers)
{
	handlers = handlers.map(([ predicate, handler_fn ], index) =>
	{
		check.as(`handlers[${ index }].handler_fn`, Function, handler_fn)

		return [ match(predicate), handler_fn ]
	})

	return (error) =>
	{
		for (var [ mexp, handler_fn ] of handlers)
		{
			if (mexp(error))
			{
				return handler_fn(error)
			}
		}

		throw error
	}
}
