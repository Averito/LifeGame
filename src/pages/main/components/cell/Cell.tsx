import { CellProps } from '@pages/main/components/cell/Cell.types.ts'
import { FC, useMemo } from 'react'
import { Graphics } from '@pixi/react'

export const Cell: FC<CellProps> = ({
	cell,
	boardWidth,
	boardHeight,
	size
}) => {
	const backgroundColor = useMemo(
		() => (cell.isLife ? cell.color : '#404040'),
		[cell]
	)

	// const onClickCell = () => {
	// 	if (!stop) return toast.error('Требуется остановить игру!')
	// 	updateCell({
	// 		...cell,
	// 		isLife: !cell.isLife
	// 	})
	// }

	const drawGraphics = (g: any) => {
		const cellX = Math.floor(cell.id % boardWidth) * size
		const cellY = Math.ceil(cell.id / boardHeight) * size

		g.clear()
		g.beginFill(backgroundColor)
		g.lineStyle(1, '#323232', 1)
		g.moveTo(cellX, cellY)
		g.lineTo(cellX + size, cellY)
		g.lineTo(cellX + size, cellY + size)
		g.lineTo(cellX, cellY + size)
		g.lineTo(cellX, cellY)
		g.endFill()

		g.onclick = () => {
			console.log('click')
		}
	}

	return <Graphics draw={drawGraphics} />
}
