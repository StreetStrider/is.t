/* @composite */

import PropType from './PropType.js'
import Contract from './Contract.js'
import check    from '../check.js'


var prop = PropType('length', Number)

export default Contract('Length', (value) =>
{
	check(prop, value)
})
