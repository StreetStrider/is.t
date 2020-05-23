
import def from 'def-prop'
import val from 'def-prop/val'


const trait = Symbol('Wrong')


export default function Wrong (code, options)
{
	if (is_object(code))
	{
		options = { ...code }
	}
	else
	{
		options = { code, ...options }
	}

	code = String(options.code)

	var wrong = new TypeError(code)

	def(wrong, 'wrong', val(true, ':enum'))
	def(wrong, trait, val(true))
	def(wrong, 'constructor', val(Wrong))
	def(wrong, 'name', val('Wrong'))

	def(wrong, 'contract', val(null, ':write', ':enum'))

	wrong.code   = code
	wrong.for    = ''
	wrong.detail = (options.detail || null)

	wrong.cause  = null
	wrong.description = (options.description || '')

	return wrong
}


Wrong.is = (value) =>
{
	return (trait in Object(value))
}


Wrong.cast = (value) =>
{
	if (Wrong.is(value))
	{
		/* @mutable */
		return value
	}
	else if (value instanceof Error)
	{
		var wrong = Wrong('bare_error')
		wrong.cause = value
		return wrong
	}
	else if (is_object(value))
	{
		return Wrong(value)
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


function is_object (value)
{
	return (Object(value) === value)
}
