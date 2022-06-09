
import ack from '../type/_/ack'

export default function check (contract, against_value)
{
	return ack(contract)(against_value)
}
