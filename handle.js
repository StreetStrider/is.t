
import check from './check'
import match from './match'


export default function handle (predicate, handler_fn)
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
		check.as(`handlers/${ index }/handler_fn`, Function, handler_fn)

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
