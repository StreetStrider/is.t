
import check from './check'
import match from './match'
import handle from './handle'
// import { multiple } from './handle'

import Values    from './type/Values'
import Prop      from './type/Prop'
import PropType  from './type/PropType'
import Tuple     from './type/Tuple'
import Record    from './type/Record'
import Enum      from './type/Enum'
import Length    from './type/Length'
import Assert    from './type/Assert'
import Condition from './type/Condition'

import Compose   from './type/Compose'
import Intersection from './type/Intersection'
import Union from './type/Union'
import Nullable from './type/Nullable'

var assert = Assert('That condition must be true')
var condition = Condition(x => x > 1, 'Value must be greater than 1')

var Glue = Compose('Glue', String, Values)
var Seq  = Compose('Seq', Array, Values)

/*

function concat (glue, seq)
{
	check.as('seq',  Seq,  seq)
	check.as('glue', Glue, glue)

	return [ ...seq ].join(glue)
}


/*
Promise.resolve()
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
	return 'match error'
})
.then(r =>
{
	console.info(r)
},
e =>
{
	console.dir(wrong, { depth: 2 })
})
//*/

// apply(() => concat('/', [ 'a', 'b', 'c' ]))
// apply(() => concat('/', new Set([ 'a', 'b', 'c' ])))
// apply(() => concat('/', {}))
// apply(() => concat(101, [ 'a', 'b', 'c' ]))
// apply(() => concat('/', []))
// apply(() => concat('', [ 'a' ]))
// apply(() => concat('/', {}))

// apply(() => check.as('some_value', 1, 2))
// apply(() => check.as('some_value', assert, false))
// apply(() => check.as('some_value', condition, 0))
// apply(() => check.as('some_value', x => x > 2, 0))

/*
apply(() => check.as('some_value', Length, {}))
apply(() => check.as('some_value', Length, { length: 'x' }))
apply(() => check.as('some_value', Length, []))
apply(() => check.as('some_value', Length, { length: 1 }))
//*/


/*
var ternary = Enum([ null, true, false ])
apply(() => check.as('some_enum', ternary, 0))
apply(() => check.as('some_enum', ternary, 1))
apply(() => check.as('some_enum', ternary, true))
apply(() => check.as('some_enum', ternary, false))
apply(() => check.as('some_enum', ternary, null))
//*/

/*
var Pair = Tuple([ Number, String ])

// apply(() => check.as('some_tuple', Pair, 0))
// apply(() => check.as('some_tuple', Pair, [  1016,   1017 ]))
// apply(() => check.as('some_tuple', Pair, [ '1', '2' ]))
// apply(() => check.as('some_tuple', Pair, [ '1',  2 ]))
// apply(() => check.as('some_tuple', Pair, [ 1 ]))
// apply(() => check.as('some_tuple', Pair, [ 1, 2, 3 ]))
//*/

/*
var prop_x = Prop(true)
apply(() => check.as('foobar', prop_x, 1))
apply(() => check.as('foobar', prop_x, {}))
apply(() => check.as('foobar', prop_x, { x: 1 }))
//*/

/*
var prop_x_number = PropType('x', Number)
apply(() => check.as('foobar', prop_x_number, 1))
apply(() => check.as('foobar', prop_x_number, {}))
apply(() => check.as('foobar', prop_x_number, { x: '1' }))
apply(() => check.as('foobar', prop_x_number, { x: 1 }))
apply(() => check.as('foobar', prop_x_number, { x: 1, y: 'y' }))
//*/

//*
var Pt = Record({ x: Number, y: Number, point: true })

// apply(() => check.as('some_point', Pt, 1))
// apply(() => check.as('some_point', Pt, {}))
// apply(() => check.as('some_point', Pt, { x: 1 }))
apply(() => check.as('some_point', Pt, { x: 1, y: 'a' }))
// apply(() => check.as('some_point', Pt, { x: 1, y: 2 }))
// apply(() => check.as('some_point', Pt, { x: 1, y: 2, point: false }))
// apply(() => check.as('some_point', Pt, { x: 1, y: 2, point: true }))
//*/

/*
var R1 = Record({ a: Number })
var R2 = Record({ b: String })
var R = Intersection(R1, R2)
var U = Union(R1, R2)

// apply(() => check.as('intr', R, {}))
// apply(() => check.as('intr', R, { a: 1 }))
// apply(() => check.as('intr', R, { a: 1, b: 2 }))
// apply(() => check.as('intr', R, { a: 1, b: 'foo' }))

// apply(() => check.as('uni', U, {}))
// apply(() => check.as('uni', U, { a: 1 }))
// apply(() => check.as('uni', U, { b: 2 }))
// apply(() => check.as('uni', U, { a: 1, b: 2 }))
// apply(() => check.as('uni', U, { a: 1, b: 'foo' }))
//*/

/*
var nul_number = Nullable(Number)

apply(() => check.as('nullable', nul_number, 1))
apply(() => check.as('nullable', nul_number, null))
apply(() => check.as('nullable', nul_number, undefined))
apply(() => check.as('nullable', nul_number, '2'))
//*/

//
import Wrong from './Wrong'

function apply (fn)
{
	try
	{
		var r = fn()
	}
	catch (wrong)
	{
		// process.stdout.write(Wrong.pretty(wrong))
		console.dir(wrong, { depth: 2 })
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
