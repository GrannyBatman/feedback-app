import { FaTimes, FaEdit } from 'react-icons/fa'
import { useFeedback } from '../context/FeedbackContext'
import { iFeedback } from '../interfaces'
import Card from './shared/Card'

interface Props {
	item: iFeedback
}

function FeedbackItem({ item }: Props) {
	const { deleteFeedback, editFeedback } = useFeedback()

	return (
		<Card>
			<div className="num-display">{item.rating}</div>
			<button className="close" onClick={() => deleteFeedback(item.id)}>
				<FaTimes color="purple" />
			</button>
			<button className="edit">
				<FaEdit color="purple" onClick={() => editFeedback(item)} />
			</button>
			<div className="text-display">{item.text}</div>
		</Card>
	)
}

export default FeedbackItem
