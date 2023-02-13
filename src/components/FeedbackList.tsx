import { useFeedback } from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'

function FeedbackList() {
	const { feedback, isLoading } = useFeedback()

	if (!isLoading && (!feedback || feedback.length < 1)) {
		return <p>No feedback yet</p>
	}

	if (isLoading) {
		return <Spinner />
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
