// TODO: Error.captureStackTrace(wrong, contract)

import Wrong from './Wrong'
import { invoke } from './_/attempt'
import check1 from './_/check'
import unitval from './_/unitval'


export default function check (contract, against_value)
{
	switch (arguments.length)
	{
	case 0:  return check
	case 1:  return (against_value) => check1(contract, against_value)
	default: return check1(contract, against_value)
	}
}


check.unit = check_unit
check.as   = check_as
check.sub  = check_sub


function check_unit (against_unit, contract)
{
	var [ name, against_value ] = unitval(against_unit)

	return check_as(name, contract, against_value)
}


function check_as (name, contract, against_value)
{
	check1(String, name)

	return invoke(check1, [ contract, against_value ], as_issuer(name))
}

function as_issuer (issuer)
{
	return (wrong) =>
	{
		wrong.issuer.unshift(issuer)
		throw wrong
	}
}


function check_sub (contract, against_value, sub_fn)
{
	check_as('sub_fn', Function, sub_fn)

	return invoke(check1, [ contract, against_value ], as_sub_of(sub_fn))
}

function as_sub_of (sub_fn)
{
	return (cause) =>
	{
		var
		wrong = Wrong.cast(sub_fn())
		wrong.cause = Wrong.cast(cause)
		throw wrong
	}
}
