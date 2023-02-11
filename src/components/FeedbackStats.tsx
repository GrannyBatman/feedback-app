import { useFeedback } from '../context/FeedbackContext'

function FeedbackStats() {
	const { feedback } = useFeedback()
	const averageRating = (
		feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length
	)
		.toFixed(1)
		.replace(/[.,]0$/, '')

	return (
		<div className="feedback-stats">
			<h4>{feedback.length} Reviews</h4>
			<h4>Average Rating: {isNaN(+averageRating) ? 0 : averageRating}</h4>
		</div>
	)
}

export default FeedbackStats
