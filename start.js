
import check from './check'

import Compose from './Compose'
import Values  from './Values'
import Tuple   from './Tuple'
import Prop    from './Prop'
import Length  from './Length'

var Glue = Compose(String, Values)
var Seq  = Compose(Array,  Values)

function concat (glue, seq)
{
	check.as('seq',  Seq,  seq)
	check.as('glue', Glue, glue)

	return [ ...seq ].join(glue)
}

var Pair = Tuple([ String, Number ])

// attempt(() => Pair(0))
// attempt(() => Pair([  1,   2 ]))
// attempt(() => Pair([ '1', '2' ]))
// attempt(() => Pair([ '1',  2 ]))
// attempt(() => Pair([ 1 ]))
// attempt(() => Pair([ 1, 2, 3 ]))

// attempt(() => concat('/', [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', new Set([ 'a', 'b', 'c' ])))
// attempt(() => concat('/', {}))
// attempt(() => concat(101, [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', []))
// attempt(() => concat('', [ 'a' ]))
// attempt(() => concat('/', {}))

// var prop_x = Prop('x')
// attempt(() => prop_x(1))
// attempt(() => prop_x({}))
// attempt(() => prop_x({ x: 1 }))

attempt(() => check.as('x', Length, { length: true }))

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
