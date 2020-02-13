
import Iterable from './Iterable'


console.log(Iterable)


function concat (glue, seq)
{
	// seq = Iterable.cast(seq, [])
	seq = Iterable(seq)

	return [ ...seq ].join(glue)
}


attempt(() => concat('/', [ 'a', 'b', 'c' ]))
attempt(() => concat('/', new Set([ 'a', 'b', 'c' ])))
attempt(() => concat('/', {}))

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
