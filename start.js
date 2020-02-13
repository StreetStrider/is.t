
import check from './check'
import Iterable from './Iterable'


function concat (glue, seq)
{
	check(Iterable, seq)
	check(String,   glue)

	return [ ...seq ].join(glue)
}


attempt(() => concat('/', [ 'a', 'b', 'c' ]))
attempt(() => concat('/', new Set([ 'a', 'b', 'c' ])))
attempt(() => concat('/', {}))
attempt(() => concat(101, [ 'a', 'b', 'c' ]))

//
function attempt (fn)
{
	try
	{
		var r = fn()
	}
	catch (e)
	{
		console.error(e)
		return
	}
	{
		console.log(r)
	}
}
