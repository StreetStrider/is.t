
import check from './check'
import Match from './match'


export default function handle (predicate, handler_fn)
{
	check.as('handler_fn', Function, handler_fn)

	var match = Match(predicate)

	return (error) =>
	{
		if (match(error))
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

		return [ Match(predicate), handler_fn ]
	})

	return (error) =>
	{
		for (var [ match, handler_fn ] of handlers)
		{
			if (match(error))
			{
				return handler_fn(error)
			}
		}

		throw error
	}
}
