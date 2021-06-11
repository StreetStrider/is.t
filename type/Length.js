/* @composite */

import PropType from './PropType'
import Contract from './Contract'
import check    from '../check'


var prop = PropType('length', Number)

export default Contract('Length', (value) =>
{
	check(prop, value)
})
