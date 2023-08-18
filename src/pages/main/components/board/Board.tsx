import { FC, useEffect, useRef, useState } from 'react'

import styles from './Board.module.scss'
import { BoardProps } from './Board.types.ts'
import { Cell } from '@pages/main/components'
import { ICell } from '@pages/main/components/cell'

export const Board: FC<BoardProps> = ({ options, stop, reset }) => {
	const [cells, setCells] = useState<ICell[][]>([])

	const getRandomNumber = (max: number): number => {
		return Math.floor(Math.random() * max)
	}

	const getRandomColor = () =>
		`rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(
			255
		)})`

	useEffect(() => {
		setCells(prevState =>
			prevState.map(row =>
				row.map(cell => ({
					...cell,
					color:
						options.cellColor === 'random'
							? getRandomColor()
							: options.cellColor
				}))
			)
		)
	}, [options.cellColor])

	useEffect(() => {
		const cells: ICell[][] = []
		let id = 0

		for (let y = 0; y < options.height; y++) {
			cells.push([])

			for (let x = 0; x < options.width; x++) {
				let color = options.cellColor

				if (options.cellColor === 'random') {
					color = getRandomColor()
				}

				id++
				cells[y].push({
					id,
					color,
					isLife: false
				})
			}
		}

		setCells(cells)
	}, [options.width, options.height, reset])

	const timeout = useRef<ReturnType<typeof setTimeout>>()
	useEffect(() => {
		if (stop) return clearTimeout(timeout.current)
		const newCells: ICell[][] = []

		for (let y = 0; y < cells.length; y++) {
			newCells.push([])

			for (let x = 0; x < cells[y].length; x++) {
				let newCell = cells[y][x]
				let liveCells = 0

				for (let y2 = -1; y2 <= 1; y2++) {
					for (let x2 = -1; x2 <= 1; x2++) {
						if (!cells[y + y2]?.[x + x2]) continue

						if (y2 === 0 && x2 === 0) continue

						if (cells[y + y2][x + x2].isLife) liveCells += 1
					}
				}

				if (cells[y][x].isLife && !(liveCells >= 2 && liveCells <= 3)) {
					newCell = {
						id: cells[y][x].id,
						color: cells[y][x].color,
						isLife: false
					}
				}

				if (!cells[y][x].isLife && liveCells === 3) {
					newCell = {
						id: cells[y][x].id,
						color: cells[y][x].color,
						isLife: true
					}
				}

				newCells[y].push(newCell)
			}
		}

		setTimeout(() => {
			if (stop) return clearTimeout(timeout.current)
			setCells(newCells)
		}, options.speed)
	}, [stop, options.speed, cells])

	const updateCell = (cell: ICell) => {
		setCells(prevState =>
			prevState.map(row =>
				row.map(oldCell => (oldCell.id === cell.id ? cell : oldCell))
			)
		)
	}

	const gridStyles = {
		width: options.width * 20,
		height: options.height * 20,
		gridTemplateRows: `repeat(${options.height}, 1fr)`,
		gridTemplateColumns: `repeat(${options.width}, 1fr)`
	}

	return (
		<div className={styles.board} style={gridStyles}>
			{cells.map(row =>
				row.map(cell => (
					<Cell
						cell={cell}
						stop={stop}
						boardWidth={options.width}
						boardHeight={options.height}
						updateCell={updateCell}
						key={cell.id}
					/>
				))
			)}
		</div>
	)
}
