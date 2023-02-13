import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { iFeedback } from '../interfaces'

// interfaces
interface ContextProps {
	feedback: iFeedback[]
	isLoading: boolean
	deleteFeedback: (id: string) => void
	addFeedback: (newFeedback: FeedbackFormProps) => void
	editFeedback: (id: iFeedback) => void
	feedbackEdit: FeedbackEditProps
	updateFeedback: (id: string, item: FeedbackFormProps) => void
}
interface ProviderProps {
	children: ReactNode
}
interface FeedbackEditProps {
	item: iFeedback
	edit: boolean
}
interface FeedbackFormProps {
	rating: number
	text: string
}

// context
const FeedbackContext = createContext({} as ContextProps)

export function useFeedback() {
	return useContext(FeedbackContext)
}

// provider
export function FeedbackProvider({ children }: ProviderProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState<iFeedback[]>([])
	const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditProps>({
		item: {} as iFeedback,
		edit: false,
	})

	// get feedback data
	useEffect(() => {
		fetchFeedback()
	}, [])

	async function fetchFeedback() {
		try {
			const response = await fetch('/feedback?_sort=id&_order=desc')
			const data: iFeedback[] = await response.json()
			setFeedback(data)
			setIsLoading(false)
		} catch (error: any) {
			throw new Error(error)
		}
	}

	const deleteFeedback = async (id: string) => {
		if (window.confirm('Are you sure you want to delete ?')) {
			await fetch(`/feedback/${id}`, {
				method: 'DELETE',
			})

			setFeedback(state => state.filter(item => item.id !== id))
		}
	}

	const addFeedback = async (newFeedback: FeedbackFormProps) => {
		const response = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})
		const data = await response.json()

		setFeedback([data, ...feedback])
	}

	// Set item to updated
	const editFeedback = (item: iFeedback) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	// update feedback item
	const updateFeedback = async (id: string, item: FeedbackFormProps) => {
		await fetch(`/feedback/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item),
		})

		setFeedback(feedback.map(i => (i.id !== id ? i : { id, ...item })))

		// reset feedbackEdit
		setFeedbackEdit({
			item: {} as iFeedback,
			edit: false,
		})
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				isLoading,
				deleteFeedback,
				addFeedback,
				editFeedback,
				feedbackEdit,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}
