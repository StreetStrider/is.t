
var num = 1

export default function assess (fn)
{
	console.info(`#${ num++ }`)

	try
	{
		var r = fn()
	}
	catch (wrong)
	{
		console.dir(wrong, { depth: 2 })
		return
	}

	console.log('OK:', r)
}
