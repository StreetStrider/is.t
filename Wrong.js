
import def from 'def-prop'
import val from 'def-prop/val'


export default function Wrong (code, message)
{
	if (! message)
	{
		message = code
	}

	var wrong = new TypeError(message)

	def(wrong, 'wrong', val(true, ':enum'))
	def(wrong, trait, val(true))
	def(wrong, 'constructor', val(Wrong))
	def(wrong, 'name', val('Wrong'))

	wrong.code  = code
	wrong.for   = ''
	wrong.cause = null

	def(wrong, 'contract', val(null, ':write', ':enum'))

	return wrong
}


var trait = Symbol('Wrong')

Wrong.is = (value) =>
{
	return (trait in Object(value))
}
