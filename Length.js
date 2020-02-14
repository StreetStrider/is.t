
import Prop from './Prop'
import Contract from './Contract'
import check from './check'


var prop = Prop('length')

export default Contract('Length', (value) =>
{
	prop(value)

	check(Number, value.length)

	return true
})
