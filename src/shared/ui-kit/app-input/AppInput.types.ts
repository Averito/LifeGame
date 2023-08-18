export interface AppInputProps {
	type: 'text' | 'number'
	value: string
	onChange: (value: string) => void
	margin?: string
	placeholder?: string
	label?: string
}
