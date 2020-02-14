
import ack from './ack'


export default function check (contract, value)
{
	return ack(contract)(value)
}

check.as = (name, contract, value) =>
{
	check(String, name)

	try
	{
		return check(contract, value)
	}
	catch (wrong)
	{
		wrong.for = name
		wrong.message = ('`' + name + '`') + ' ' + wrong.message

		throw wrong
	}
}
