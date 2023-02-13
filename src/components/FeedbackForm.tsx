import { useEffect, useState } from 'react'
import { useFeedback } from '../context/FeedbackContext'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'

function FeedbackForm() {
	const [text, setText] = useState('')
	const [rating, setRating] = useState(10)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState('')
	const { addFeedback, feedbackEdit, updateFeedback } = useFeedback()

	// set editing feedback values to form
	useEffect(() => {
		if (!feedbackEdit.edit) return
		setText(feedbackEdit.item.text)
		setRating(feedbackEdit.item.rating)
		setBtnDisabled(false)
	}, [feedbackEdit])

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value

		if (value === '') {
			setMessage('')
			setBtnDisabled(true)
		} else if (value.trim().length <= 10) {
			setMessage('Text must be at least 10 characters')
			setBtnDisabled(true)
		} else {
			setMessage('')
			setBtnDisabled(false)
		}

		setText(value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (text.trim().length <= 10) return

		if (feedbackEdit.edit === true) {
			// update existing feedback
			updateFeedback(feedbackEdit.item.id, {
				text,
				rating,
			})
		} else {
			// add new feedback
			addFeedback({
				text,
				rating,
			})
		}

		// reset form
		setText('')
		setRating(10)
		setBtnDisabled(true)
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate service with us?</h2>
				<RatingSelect
					rating={rating}
					selectRating={rating => setRating(rating)}
				/>
				<div className="input-group">
					<input
						type="text"
						value={text}
						onChange={handleTextChange}
						placeholder="Write a review"
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm
