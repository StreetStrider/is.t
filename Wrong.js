

export default function Wrong (code, message)
{
	if (! message)
	{
		message = code
	}

	var wrong = new TypeError(message)

	wrong.wrong  = 'yes'
	wrong[trait] = true
	wrong.constructor = Wrong

	wrong.code     = code
	wrong.contract = null
	wrong.cause    = null

	return wrong
}


var trait = Symbol('Wrong')

Wrong.is = (value) =>
{
	return (trait in Object(value))
}
