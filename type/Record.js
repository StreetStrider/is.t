/* @composite */

import Contract from './Contract'
import check    from '../check'
import PropType from './PropType'


export default function Record (record)
{
	check.as('record', Object, record)

	record = shape(record)

	return Contract('Record', value =>
	{
		check(Object, value)

		for (let key in record)
		{
			check(record[key], value)
		}

		// TODO: strict?
		// TODO: optional?
	})
}


function shape (record)
{
	record = { ...record }

	for (let key in record)
	{
		record[key] = PropType(key, record[key])
	}

	return record
}
