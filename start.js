
import check from './check'

import Compose  from './Compose'
import Values   from './Values'
import Prop     from './Prop'
import PropType from './PropType'
import Tuple    from './Tuple'
import Record   from './Record'
import Enum     from './Enum'
import Length   from './Length'
import Assert   from './Assert'

var Glue = Compose(String, Values)
var Seq  = Compose(Array,  Values)

var assert = Assert('that condition must be true')

function concat (glue, seq)
{
	check.as('seq',  Seq,  seq)
	check.as('glue', Glue, glue)

	return [ ...seq ].join(glue)
}

attempt(() => check.as('some_value', assert, false))

/*
var ternary = Enum([ null, true, false ])
attempt(() => check.as('some_enum', ternary, 0))
attempt(() => check.as('some_enum', ternary, 1))
attempt(() => check.as('some_enum', ternary, true))
attempt(() => check.as('some_enum', ternary, false))
attempt(() => check.as('some_enum', ternary, null))
//*/

//*
var Pair = Tuple([ String, Number ])

// attempt(() => check.as('some_tuple', Pair, 0))
attempt(() => check.as('some_tuple', Pair, [  1,   2 ]))
// attempt(() => check.as('some_tuple', Pair, [ '1', '2' ]))
// attempt(() => check.as('some_tuple', Pair, [ '1',  2 ]))
// attempt(() => check.as('some_tuple', Pair, [ 1 ]))
// attempt(() => check.as('some_tuple', Pair, [ 1, 2, 3 ]))
//*/

// attempt(() => concat('/', [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', new Set([ 'a', 'b', 'c' ])))
// attempt(() => concat('/', {}))
// attempt(() => concat(101, [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', []))
// attempt(() => concat('', [ 'a' ]))
// attempt(() => concat('/', {}))

/*
var prop_x = Prop('x')
attempt(() => check.as('foobar', prop_x, 1))
attempt(() => check.as('foobar', prop_x, {}))
attempt(() => check.as('foobar', prop_x, { x: 1 }))
//*/

/*
var prop_x_number = PropType('x', Number)
attempt(() => check.as('foobar', prop_x_number, 1))
attempt(() => check.as('foobar', prop_x_number, {}))
attempt(() => check.as('foobar', prop_x_number, { x: '1' }))
attempt(() => check.as('foobar', prop_x_number, { x: 1 }))
//*/

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
import Wrong from './Wrong'

function attempt (fn)
{
	try
	{
		var r = fn()
	}
	catch (wrong)
	{
		// process.stdout.write(Wrong.pretty(wrong))
		console.log(wrong)
		// console.log(Wrong.cleanup(wrong))
		// console.error(wrong)
		// console.warn(wrong.contract)
		// console.debug('cause:', wrong.cause)
		return
	}
	{
		console.info(r)
	}
}
