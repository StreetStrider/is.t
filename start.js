
import check from './check'
import match from './match'
import handle from './handle'
// import { multiple } from './handle'

import Values    from './Values'
import Prop      from './Prop'
import PropType  from './PropType'
import Tuple     from './Tuple'
import Record    from './Record'
import Enum      from './Enum'
import Length    from './Length'
import Assert    from './Assert'
import Condition from './Condition'

import Compose   from './Compose'
import Intersection from './Intersection'
import Union from './Union'

var Glue = Compose('Glue', String, Values)
var Seq  = Compose('Seq', Array, Values)

var assert = Assert('That condition must be true')
var condition = Condition(x => x > 1, 'Value must be greater than 1')

// 
function concat (glue, seq)
{
	check.as('seq',  Seq,  seq)
	check.as('glue', Glue, glue)

	return [ ...seq ].join(glue)
}

/*
attempt(async () =>
{
	return await Promise.resolve()
	.then(() =>
	{
		// return check(1, { x: 1 })
		// return concat(101, [ 'a', 'b', 'c' ])
		return concat('/', [])
		// throw new Error('foo')
	})
	.catch(handle({ detail: { actual: { x: 1 } } }, (wrong) =>
	{
		console.log(wrong)
		return 'match 1'
	}))
	.catch(handle('must_be_string', (wrong) =>
	{
		console.log(wrong)
		return 'match 2'
	}))
	.catch(handle({ wrong: true }, (wrong) =>
	{
		console.log(wrong)
		return 'match 3'
	}))
	.catch((error) =>
	{
		console.log(error)
		return 'error'
	})
})
//*/

// attempt(() => concat('/', [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', new Set([ 'a', 'b', 'c' ])))
// attempt(() => concat('/', {}))
// attempt(() => concat(101, [ 'a', 'b', 'c' ]))
// attempt(() => concat('/', []))
// attempt(() => concat('', [ 'a' ]))
// attempt(() => concat('/', {}))

// attempt(() => check.as('some_value', 1, 2))
// attempt(() => check.as('some_value', assert, false))
// attempt(() => check.as('some_value', condition, 0))
// attempt(() => check.as('some_value', x => x > 2, 0))

/*
attempt(() => check.as('some_value', Length, {}))
attempt(() => check.as('some_value', Length, { length: 'x' }))
attempt(() => check.as('some_value', Length, []))
attempt(() => check.as('some_value', Length, { length: 1 }))
//*/


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

/*
// attempt(() => check.as('some_tuple', Pair, 0))
attempt(() => check.as('some_tuple', Pair, [  1,   2 ]))
// attempt(() => check.as('some_tuple', Pair, [ '1', '2' ]))
attempt(() => check.as('some_tuple', Pair, [ '1',  2 ]))
attempt(() => check.as('some_tuple', Pair, [ 1 ]))
attempt(() => check.as('some_tuple', Pair, [ 1, 2, 3 ]))
//*/

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
attempt(() => check.as('foobar', prop_x_number, { x: 1, y: 'y' }))
//*/

/*
var Pt = Record({ x: Number, y: Number, point: true })

attempt(() => check.as('some_point', Pt, 1))
attempt(() => check.as('some_point', Pt, {}))
// attempt(() => check.as('some_point', Pt, { x: 1 }))
attempt(() => check.as('some_point', Pt, { x: 1, y: 'a' }))
// attempt(() => check.as('some_point', Pt, { x: 1, y: 2 }))
// attempt(() => check.as('some_point', Pt, { x: 1, y: 2, point: false }))
attempt(() => check.as('some_point', Pt, { x: 1, y: 2, point: true }))
//*/

var R1 = Record({ a: Number })
var R2 = Record({ b: String })
var R = Intersection(R1, R2)
var U = Union(R1, R2)

// attempt(() => check.as('intr', R, {}))
// attempt(() => check.as('intr', R, { a: 1 }))
// attempt(() => check.as('intr', R, { a: 1, b: 2 }))
attempt(() => check.as('intr', R, { a: 1, b: 'foo' }))

attempt(() => check.as('uni', U, {}))
attempt(() => check.as('uni', U, { a: 1 }))
attempt(() => check.as('uni', U, { b: 2 }))
attempt(() => check.as('uni', U, { a: 1, b: 2 }))
attempt(() => check.as('uni', U, { a: 1, b: 'foo' }))

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
