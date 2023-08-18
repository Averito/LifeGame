import styles from './Cell.module.scss'
import { CellProps } from '@pages/main/components/cell/Cell.types.ts'
import { FC, useMemo } from 'react'
import { toast } from 'react-toastify'

export const Cell: FC<CellProps> = ({
	cell,
	boardWidth,
	boardHeight,
	updateCell,
	stop
}) => {
	const width = useMemo(() => (boardWidth * 20) / boardWidth - 1, [boardWidth])
	const height = useMemo(
		() => (boardHeight * 20) / boardHeight - 1,
		[boardHeight]
	)
	const backgroundColor = useMemo(
		() => (cell.isLife ? cell.color : '#404040'),
		[cell]
	)

	const onClickCell = () => {
		if (!stop) return toast.error('Требуется остановить игру!')
		updateCell({
			...cell,
			isLife: !cell.isLife
		})
	}

	return (
		<div
			className={styles.cell}
			data-id={cell.id}
			style={{ backgroundColor, width, height }}
			onClick={onClickCell}
		/>
	)
}
