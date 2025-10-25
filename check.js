
import Wrong from './Wrong.js'
import { invoke } from './_/attempt.js'
import { toptrace } from './_/attempt.js'
import set_trace from './_/set-trace.js'
import check1 from './_/check.js'
import unitval from './_/unitval.js'


export default function check (contract, against_value)
{
	switch (arguments.length)
	{
	case 0:
		return check

	case 1:
		return function check_contract (against_value)
		{
			toptrace(check1, [ contract, against_value ], check_contract)
		}

	default:
		return toptrace(check1, [ contract, against_value ], check)
	}
}


check.unit = check_unit
check.as   = check_as
check.sub  = check_sub


function check_unit (against_unit, contract)
{
	var [ name, against_value ] = unitval(against_unit)

	return toptrace(check_as, [ name, contract, against_value ], check_unit)
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
		set_trace(wrong, check_as)
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
		var wrong   = Wrong.cast(sub_fn())
		wrong.cause = Wrong.cast(cause)
		set_trace(wrong, check_sub)
		throw wrong
	}
}
