
import Contract from './Contract'
import check    from './check'
import PropType from './PropType'


export default function Record (record)
{
	check.as('record', Object, record)

	record = props(record)

	return Contract('Record', value =>
	{
		check(Object, value)

		for (let key in record)
		{
			check.as(key, record[key], value)
		}
	})
}


function props (record)
{
	record = { ...record }

	for (let key in record)
	{
		record[key] = PropType(key, record[key])
	}

	return record
}
