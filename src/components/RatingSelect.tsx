interface Props {
	rating: number
	selectRating: (rating: number) => void
}

function RatingSelect({ rating, selectRating }: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		selectRating(+e.target.value)
	}

	return (
		<ul className="rating">
			{Array.from({ length: 10 }, (_, i) => (
				<li key={`rating-${i + 1}`}>
					<input
						type="radio"
						id={`num${i + 1}`}
						name="rating"
						value={i + 1}
						onChange={handleChange}
						checked={rating === i + 1}
					/>
					<label htmlFor={`num${i + 1}`}>{i + 1}</label>
				</li>
			))}
		</ul>
	)
}

export default RatingSelect
