import { FC, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import cs from 'classnames'

import styles from './Options.module.scss'
import { OptionsProps } from '@pages/main/components/options/Options.types.ts'
import { IBoardOptions } from '@pages/main/components/board'
import { AppInput } from '@shared/ui-kit/app-input/AppInput.tsx'

export const Options: FC<OptionsProps> = ({ accept, options }) => {
	const [active, setActive] = useState<boolean>(false)
	const [newOptions, setNewOptions] = useState<IBoardOptions>(options)

	const onClickActive = () => {
		setActive(prevState => !prevState)
	}

	const onChangeWidth = (width: string) => {
		setNewOptions(prevState => ({
			...prevState,
			width: parseInt(width) || 30
		}))
	}

	const onChangeHeight = (height: string) => {
		setNewOptions(prevState => ({
			...prevState,
			height: parseInt(height) || 30
		}))
	}

	const onChangeSpeed = (speed: string) => {
		setNewOptions(prevState => ({
			...prevState,
			speed: parseInt(speed) < 1 ? 10 : parseInt(speed)
		}))
	}

	const onChangeColor = (color: string) => {
		setNewOptions(prevState => ({
			...prevState,
			cellColor: color || 'random'
		}))
	}

	const onClickAcceptOptions = () => {
		accept(newOptions)
	}

	return (
		<div className={cs(styles.container, { [styles.active]: active })}>
			<div className={styles.buttonWrapper}>
				<button className={styles.button} onClick={onClickActive}>
					<BsArrowRight className={styles.buttonArrow} size={20} />
				</button>
			</div>

			<h1 className={styles.title}>Настройки</h1>

			<AppInput
				type='number'
				placeholder='Ширина'
				label='Ширина'
				value={newOptions.width.toString()}
				onChange={onChangeWidth}
			/>
			<AppInput
				type='number'
				placeholder='Высота'
				label='Высота'
				value={newOptions.height.toString()}
				onChange={onChangeHeight}
			/>
			<AppInput
				type='number'
				placeholder='Скорость (мс)'
				label='Скорость (мс)'
				value={newOptions.speed.toString()}
				onChange={onChangeSpeed}
			/>
			<AppInput
				type='text'
				placeholder='Цвет'
				label='Цвет'
				value={newOptions.cellColor}
				onChange={onChangeColor}
			/>
			<button onClick={onClickAcceptOptions}>Применить</button>
		</div>
	)
}
