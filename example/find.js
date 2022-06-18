
import check from 'is.t/check'
import Iterable from 'is.t/type/Iterable'

function find (sequence, predicate) {
	/* check.unit allows local variable name to be in the details */
	/* Iterable is a Contract */
	check.unit({ sequence }, Iterable)
	/* Function constructor used as a Contract */
	check.unit({ predicate }, Function)

	for (const item of sequence) {
		const bool = predicate(item)
		/* It is possible to check runtime constraints */
		check.as('predicate return value', Boolean, bool)
		if (bool) {
			return item
		}
	}
}

import assess from 'is.t/_/assess'

assess(() => find())
assess(() => find([]))
assess(() => find([ 1, 2, 3 ]))
assess(() => find([ 1, 2, 3 ], () => null))
assess(() => find([ 1, 2, 3 ], (x) => !(x % 2)))
