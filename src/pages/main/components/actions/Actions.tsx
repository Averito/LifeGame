import { FC } from 'react'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { GrPowerReset } from 'react-icons/gr'

import styles from './Actions.module.scss'
import { ActionsProps } from '@pages/main/components/actions/Actions.types.ts'

export const Actions: FC<ActionsProps> = ({ start, pause, stop, reset }) => {
	return (
		<div className={styles.actions}>
			<div className={styles.button} onClick={stop ? start : pause}>
				{stop ? (
					<BsFillPlayFill color='#323232' size={20} />
				) : (
					<BsPauseFill color='#323232' size={20} />
				)}
			</div>

			<div className={styles.button} onClick={reset}>
				<GrPowerReset color='#323232' size={20} />
			</div>
		</div>
	)
}
