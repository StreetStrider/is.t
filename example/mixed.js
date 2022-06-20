
import check from 'is.t/check'
import match from 'is.t/match'
import handle from 'is.t/handle'
// import { multiple } from 'is.t/handle'

import Values    from 'is.t/type/Values'
import Prop      from 'is.t/type/Prop'
import PropType  from 'is.t/type/PropType'
import Tuple     from 'is.t/type/Tuple'
import Record    from 'is.t/type/Record'
import Enum      from 'is.t/type/Enum'
import Length    from 'is.t/type/Length'
import Assert    from 'is.t/type/Assert'
import Condition from 'is.t/type/Condition'

import Compose   from 'is.t/type/Compose'
import Intersection from 'is.t/type/Intersection'
import Union from 'is.t/type/Union'
import Nullable from 'is.t/type/Nullable'

import assess from 'is.t/_/assess'

var assert = Assert('That condition must be true')
var condition = Condition(x => x > 1, 'Value must be greater than 1')

var Glue = Compose('Glue', String, Values)
var Seq  = Compose('Seq', Array, Values)

//*

function concat (glue, seq)
{
	check.unit({ seq }, Seq)
	check.unit({ glue }, Glue)

	return [ ...seq ].join(glue)
}

//*
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

// assess(() => concat('/', [ 'a', 'b', 'c' ]))
// assess(() => concat('/', new Set([ 'a', 'b', 'c' ])))
// assess(() => concat('/', {}))
// assess(() => concat(101, [ 'a', 'b', 'c' ]))
// assess(() => concat('/', []))
// assess(() => concat('', [ 'a' ]))
// assess(() => concat('/', {}))

// assess(() => check.as('some_value', 1, 2))
// assess(() => check.as('some_value', assert, false))
// assess(() => check.as('some_value', condition, 0))
// assess(() => check.as('some_value', x => x > 2, 0))

//*
assess(() => check.as('some_value', Length, {}))
assess(() => check.as('some_value', Length, { length: 'x' }))
assess(() => check.as('some_value', Length, []))
assess(() => check.as('some_value', Length, { length: 1 }))
//*/


/*
var ternary = Enum([ null, true, false ])
assess(() => check.as('some_enum', ternary, 0))
assess(() => check.as('some_enum', ternary, 1))
assess(() => check.as('some_enum', ternary, true))
assess(() => check.as('some_enum', ternary, false))
assess(() => check.as('some_enum', ternary, null))
//*/

//*
var Pair = Tuple([ Number, String ])

assess(() => check.as('some_tuple', Pair, 0))
// assess(() => check.as('some_tuple', Pair, [  1016,   1017 ]))
// assess(() => check.as('some_tuple', Pair, [ '1', '2' ]))
// assess(() => check.as('some_tuple', Pair, [ '1',  2 ]))
// assess(() => check.as('some_tuple', Pair, [ 1 ]))
// assess(() => check.as('some_tuple', Pair, [ 1, 2, 3 ]))
//*/

/*
var prop_x = Prop(true)
assess(() => check.as('foobar', prop_x, 1))
assess(() => check.as('foobar', prop_x, {}))
assess(() => check.as('foobar', prop_x, { x: 1 }))
//*/

/*
var prop_x_number = PropType('x', Number)
assess(() => check.as('foobar', prop_x_number, 1))
assess(() => check.as('foobar', prop_x_number, {}))
assess(() => check.as('foobar', prop_x_number, { x: '1' }))
assess(() => check.as('foobar', prop_x_number, { x: 1 }))
assess(() => check.as('foobar', prop_x_number, { x: 1, y: 'y' }))
//*/

/*
var Pt = Record({ x: Number, y: Number, point: true })

// assess(() => check.as('some_point', Pt, 1))
// assess(() => check.as('some_point', Pt, {}))
// assess(() => check.as('some_point', Pt, { x: 1 }))
assess(() => check.as('some_point', Pt, { x: 1, y: 'a' }))
// assess(() => check.as('some_point', Pt, { x: 1, y: 2 }))
// assess(() => check.as('some_point', Pt, { x: 1, y: 2, point: false }))
// assess(() => check.as('some_point', Pt, { x: 1, y: 2, point: true }))
//*/

/*
var R1 = Record({ a: Number })
var R2 = Record({ b: String })
var R = Intersection(R1, R2)
var U = Union(R1, R2)

// assess(() => check.as('intr', R, {}))
// assess(() => check.as('intr', R, { a: 1 }))
// assess(() => check.as('intr', R, { a: 1, b: 2 }))
// assess(() => check.as('intr', R, { a: 1, b: 'foo' }))

// assess(() => check.as('uni', U, {}))
// assess(() => check.as('uni', U, { a: 1 }))
// assess(() => check.as('uni', U, { b: 2 }))
// assess(() => check.as('uni', U, { a: 1, b: 2 }))
// assess(() => check.as('uni', U, { a: 1, b: 'foo' }))
//*/

/*
var nul_number = Nullable(Number)

assess(() => check.as('nullable', nul_number, 1))
assess(() => check.as('nullable', nul_number, null))
assess(() => check.as('nullable', nul_number, undefined))
assess(() => check.as('nullable', nul_number, '2'))
//*/
