
import ack from './type/_/ack'


export default function check (contract, value)
{
	switch (arguments.length)
	{
	case 0:  return check
	case 1:  return ack(contract)
	default: return ack(contract)(value)
	}
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


import Wrong from './Wrong'


check.cause = (contract, value, sub_fn) =>
{
	check.as('sub_fn', Function, sub_fn)

	return attempt(
		()      => { return check(contract, value) },
		(cause) => { throw caused(sub_fn, cause) },
	)
}

function caused (sub_fn, cause)
{
	var
	wrong = sub_fn(cause)
	wrong = Wrong.cast(wrong)
	wrong.cause = cause
	return wrong
}
