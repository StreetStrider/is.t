
import ack from '../type/_/ack.js'


export default function check (contract, against_value)
{
	return ack(contract)(against_value)
}
