import { createContext, ReactNode, useContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'
import { iFeedback } from '../interfaces'

// interfaces
interface ContextProps {
	feedback: iFeedback[]
	deleteFeedback: (id: string) => void
	addFeedback: (newFeedback: iFeedback) => void
	editFeedback: (id: iFeedback) => void
	feedbackEdit: FeedbackEditProps
	updateFeedback: (item: iFeedback) => void
}
interface ProviderProps {
	children: ReactNode
}
interface FeedbackEditProps {
	item: iFeedback
	edit: boolean
}

// context
const FeedbackContext = createContext({} as ContextProps)

export function useFeedback() {
	return useContext(FeedbackContext)
}

// provider
export function FeedbackProvider({ children }: ProviderProps) {
	const [feedback, setFeedback] = useState<iFeedback[]>(FeedbackData)
	const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditProps>({
		item: {} as iFeedback,
		edit: false,
	})

	const deleteFeedback = (id: string) => {
		if (window.confirm('Are you sure you want to delete ?')) {
			setFeedback(state => state.filter(item => item.id !== id))
		}
	}

	const addFeedback = (newFeedback: iFeedback) => {
		setFeedback([newFeedback, ...feedback])
	}

	// Set item to updated
	const editFeedback = (item: iFeedback) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	// update feedback item
	const updateFeedback = (item: iFeedback) => {
		setFeedback(feedback.map(i => (i.id !== item.id ? i : item)))

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
