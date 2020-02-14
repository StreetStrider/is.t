
import ack from './ack'


export default function check (contract, value)
{
	return ack(contract)(value)
}

check.as = (name, contract, value) =>
{
	try
	{
		return check(contract, value)
	}
	catch (wrong)
	{
		wrong.name    = name
		wrong.message = ('`' + name + '`') + ' ' + wrong.message

		throw wrong
	}
}
