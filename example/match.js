
import check from 'is.t/check'

function sum (a, b) {
	check.unit({ a }, Number)
	check.unit({ b }, Number)

	return a + b
}

import { multiple as handle } from 'is.t/handle'

const handler = handle(
	[ { issuer: [ 'a' ] }, () => console.log('wrong a') ],
	[ { issuer: [ 'b' ] }, () => console.log('wrong b') ],
	[ 'must_be_number', () => console.log('not numbers') ],
	[ ReferenceError, () => console.log('ReferenceError') ],
	[ Error, () => console.log('any Error') ],
)

try {
	sum(1, '2')
} catch (e) {
	handler(e)
}

import attempt from 'is.t/_/attempt'

attempt(() => sum(1, '2'), handler)
attempt(() => sum('1', '2'), handler)
attempt(() => check(Number, '3'), handler)
attempt(() => console.log(ref), handler)
attempt(() => { throw new Error }, handler)

new Promise(() => sum(1, '2')).catch(handler)
