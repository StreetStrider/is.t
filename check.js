
import ack   from './ack'
import Wrong from './Wrong'


export default function check (contract, value)
{
	return ack(contract)(value)
}


import attempt from './attempt'

check.as = (name, contract, value) =>
{
	check(String, name)

	return attempt(
		()      => { return check(contract, value) },
		(wrong) => {  throw partof(wrong, name) },
	)
}

function partof (wrong, name)
{
	if (! wrong.for)
	{
		wrong.for = name
	}
	else
	{
		wrong.for = (name + '/' + wrong.for)
	}

	return wrong
}
