import { useFeedback } from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'

function FeedbackList() {
	const { feedback } = useFeedback()

	if (!feedback || feedback.length < 1) {
		return <p>No feedback yet</p>
	}
	return (
		<div className="feedback-list">
			{feedback.map(item => (
				<FeedbackItem key={item.id} item={item} />
			))}
		</div>
	)
}

export default FeedbackList
