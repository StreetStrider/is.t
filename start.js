
import check from './check'
// import Iterable from './Iterable'
import Values from './Values'
import Prop from './Prop'


function concat (glue, seq)
{
	Values(seq)
	check(String, glue)

	return [ ...seq ].join(glue)
}


attempt(() => concat('/', [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', new Set([ 'a', 'b', 'c' ])))
// attempt(() => concat('/', {}))
// attempt(() => concat(101, [ 'a', 'b', 'c' ]))
attempt(() => concat('/', []))

// var prop_x = Prop('x')
// attempt(() => prop_x(1))
// attempt(() => prop_x({}))
// attempt(() => prop_x({ x: 1 }))

//
function attempt (fn)
{
	try
	{
		var r = fn()
	}
	catch (wrong)
	{
		// console.error(wrong)
		console.log(wrong)
		// console.warn(wrong.contract)
		// console.debug('cause:', wrong.cause)
		return
	}
	{
		console.log(r)
	}
}
