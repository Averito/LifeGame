import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import styles from './Main.module.scss'
import { Actions, Board as FCBoard, Options } from './components'
import { IBoardOptions } from '@pages/main/components/board'
import { STANDARD_OPTIONS } from '@pages/main/Main.config.ts'

export const Main: FC = () => {
	const [options, setOptions] = useState<IBoardOptions>(STANDARD_OPTIONS)
	const [stop, setStop] = useState<boolean>(true)
	const [reset, setReset] = useState<boolean>(false)

	const startGame = () => {
		setStop(false)
	}

	const pauseGame = () => {
		setStop(true)
	}

	const resetGame = () => {
		if (!stop) return toast.error('Требуется остановить игру!')
		setReset(prevState => !prevState)
	}

	const onClickAcceptOptions = (newOptions: IBoardOptions) => {
		if (!stop) return toast.error('Требуется остановить игру!')
		setOptions(newOptions)
	}

	return (
		<div className={styles.container}>
			<FCBoard options={options} stop={stop} reset={reset} />
			<Actions
				start={startGame}
				pause={pauseGame}
				reset={resetGame}
				stop={stop}
			/>
			<Options options={options} accept={onClickAcceptOptions} />
		</div>
	)
}
