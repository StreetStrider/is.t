

export default function Wrong (code, message)
{
	var wrong = new TypeError(message)

	wrong.wrong  = 'yes'
	wrong[trait] = true
	wrong.constructor = Wrong

	wrong.code     = code
	wrong.message  = message
	wrong.contract = null
	wrong.cause    = null

	return wrong
}


var trait = Symbol('Wrong')

Wrong.is = (value) =>
{
	return (trait in Object(value))
}
