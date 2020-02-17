
import check from './check'

import Compose from './Compose'
import Values  from './Values'
import Prop    from './Prop'
import Tuple   from './Tuple'
import Record  from './Record'
import Length  from './Length'

var Glue = Compose(String, Values)
var Seq  = Compose(Array,  Values)

function concat (glue, seq)
{
	check.as('seq',  Seq,  seq)
	check.as('glue', Glue, glue)

	return [ ...seq ].join(glue)
}

//*
var Pair = Tuple([ String, Number ])

attempt(() => check.as('some_tuple', Pair, 0))
attempt(() => check.as('some_tuple', Pair, [  1,   2 ]))
attempt(() => check.as('some_tuple', Pair, [ '1', '2' ]))
attempt(() => check.as('some_tuple', Pair, [ '1',  2 ]))
attempt(() => check.as('some_tuple', Pair, [ 1 ]))
attempt(() => check.as('some_tuple', Pair, [ 1, 2, 3 ]))
//*/

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

/*
var Pt = Record({ x: Number, y: Number, point: true })

attempt(() => check.as('some_point', Pt, 1))
attempt(() => check.as('some_point', Pt, {}))
attempt(() => check.as('some_point', Pt, { x: 1 }))
attempt(() => check.as('some_point', Pt, { x: 1, y: 'a' }))
attempt(() => check.as('some_point', Pt, { x: 1, y: 2 }))
attempt(() => check.as('some_point', Pt, { x: 1, y: 2, point: false }))
attempt(() => check.as('some_point', Pt, { x: 1, y: 2, point: true }))
//*/

//
function attempt (fn)
{
	try
	{
		var r = fn()
	}
	catch (wrong)
	{
		console.log(wrong)
		// console.error(wrong)
		// console.warn(wrong.contract)
		// console.debug('cause:', wrong.cause)
		return
	}
	{
		console.info(r)
	}
}
