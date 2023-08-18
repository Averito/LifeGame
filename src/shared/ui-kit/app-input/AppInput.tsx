import { ChangeEventHandler, FC } from 'react'

import styles from './AppInput.module.scss'
import { AppInputProps } from '@shared/ui-kit/app-input/AppInput.types.ts'

export const AppInput: FC<AppInputProps> = ({
	margin,
	type,
	value,
	onChange,
	placeholder,
	label
}) => {
	const onChangeInput: ChangeEventHandler<HTMLInputElement> = event => {
		onChange(event.currentTarget.value)
	}

	return (
		<div style={{ margin }}>
			{label && <p className={styles.label}>{label}</p>}

			<input
				className={styles.input}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChangeInput}
			/>
		</div>
	)
}
