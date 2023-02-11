import AboutIconLink from '../components/AboutIconLink'
import FeedbackForm from '../components/FeedbackForm'
import FeedbackList from '../components/FeedbackList'
import FeedbackStats from '../components/FeedbackStats'

function Home() {
	return (
		<>
			<FeedbackForm />
			<FeedbackStats />
			<FeedbackList />
			<AboutIconLink />
		</>
	)
}

export default Home
