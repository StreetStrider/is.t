/* eslint complexity: [ 2, 6 ] */

import def from 'def-prop'
import val from 'def-prop/val'

import is_object from './_/is-object.js'

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
	code = options.code

	var wrong = new TypeError(String(code))

	def(wrong, 'wrong', val(true, ':enum'))
	def(wrong, trait, val(true))
	def(wrong, 'constructor', val(Wrong))
	def(wrong, 'name', val('Wrong'))

	wrong.contract = null

	wrong.code = code
	wrong.description = (options.description || '')
	wrong.detail = (options.detail || null)

	wrong.issuer = (options.issuer || [])
	wrong.cause  = (options.cause  || null)

	return wrong
}


Wrong.Kind = (code, options) =>
{
	return () => Wrong(code, options)
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
