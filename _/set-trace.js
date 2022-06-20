
export default function set_trace (error, top_frame)
{
	var next = error

	while (next instanceof Error)
	{
		Error.captureStackTrace(next, top_frame)
		next = next.cause
	}

	return error
}
