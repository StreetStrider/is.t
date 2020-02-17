
import ack   from './ack'
import Wrong from './Wrong'


export default function check (contract, value)
{
	return ack(contract)(value)
}


check.as = (name, contract, value) =>
{
	check(String, name)

	return decorate(contract, value, wrong =>
	{
		wrong.for = compose(name, wrong.for)
		// wrong.message = ('`' + wrong.for + '`') + ' ' + wrong.message

		throw wrong
	})
}


function decorate (contract, value, handle)
{
	try
	{
		return check(contract, value)
	}
	catch (wrong)
	{
		if (Wrong.is(wrong))
		{
			wrong = handle(wrong)
		}

		throw wrong
	}
}


function compose (name_new, name)
{
	if (! name)
	{
		return name_new
	}
	else
	{
		return (name_new + '/' + name)
	}
}
