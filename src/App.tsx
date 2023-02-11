import { Routes, Route } from 'react-router-dom'
import { FeedbackProvider } from './context/FeedbackContext'
import { About, Home, Layout, NoMatch } from './pages'

function App() {
	return (
		<FeedbackProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="*" element={<NoMatch />} />
				</Route>
			</Routes>
		</FeedbackProvider>
	)
}

export default App
