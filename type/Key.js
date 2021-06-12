/* @primitive */

import check from '../check'

import Union from './Union'
import Contract from './Contract'

const code = 'must_be_key_for_object'
const description = 'Value which can be a key is expected'

var type = Union(Number, String, Symbol)


export default Contract('Key', value =>
{
	check.cause(type, value, () => ({ code, description }))
})
