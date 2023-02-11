interface Props {
	children: React.ReactNode
	type: 'button' | 'submit'
	version?: 'primary' | 'secondary'
	isDisabled?: boolean
}

function Button({
	children,
	type,
	version = 'primary',
	isDisabled = false,
}: Props) {
	return (
		<button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
			{children}
		</button>
	)
}

export default Button
