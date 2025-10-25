/* @primitive */

import check from '../check.js'

import Union from './Union.js'
import Contract from './Contract.js'

const code = 'must_be_key_for_object'
const description = 'Value which can be a key is expected'

var type = Union(Number, String, Symbol)


export default Contract('Key', value =>
{
	check.sub(type, value, () => ({ code, description }))
})
