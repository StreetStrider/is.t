
import ack from './ack'


export default function check (contract, value)
{
	return ack(contract)(value)
}
