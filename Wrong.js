
import def from 'def-prop'
import val from 'def-prop/val'


export default function Wrong (code, options)
{
	options || (options = {})

	var wrong = new TypeError(String(code))

	def(wrong, 'wrong', val(true, ':enum'))
	def(wrong, trait, val(true))
	def(wrong, 'constructor', val(Wrong))
	def(wrong, 'name', val('Wrong'))

	def(wrong, 'contract', val(null, ':write', ':enum'))

	wrong.code   = code
	wrong.for    = ''
	wrong.detail = null

	wrong.cause  = null
	wrong.description = (options.description || '')

	return wrong
}


const trait = Symbol('Wrong')

Wrong.is = (value) =>
{
	return (trait in Object(value))
}


Wrong.cast = (value) =>
{
	if (Wrong.is(value))
	{
		return value
	}
	else if (value instanceof Error)
	{
		var wrong = Wrong('bare_error')
		wrong.cause = value
		return wrong
	}
	else if (typeof value === 'string')
	{
		return Wrong(value)
	}
	else
	{
		var wrong = Wrong('unknown_violation')
		wrong.cause = value
		return wrong
	}
}
