

export default function attempt (fn, fn_catch)
{
	try
	{
		return fn()
	}
	catch (e)
	{
		return fn_catch(e)
	}
}


export function invoke (fn, args, fn_catch)
{
	return attempt(() => fn(...(args || [])), fn_catch)
}


import set_trace from './set-trace'

export function toptrace (fn, args, trace)
{
	return invoke(fn, args, e =>
	{
		throw set_trace(e, trace)
	})
}
