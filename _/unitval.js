
import check1 from './check'
import Condition from '../type/Condition'

var keys = Object.keys
var single = Condition((unit) => keys(unit).length === 1, 'Must have only one own property')

export default function unitval (unit)
{
	check1(Object, unit)
	check1(single, unit)

	var name  = keys(unit)[0]
	var value = unit[name]

	return [ name, value ]
}
