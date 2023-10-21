import {
	FC,
	MouseEventHandler,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import { Container, Stage } from '@pixi/react'

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

	useLayoutEffect(() => {
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
					isLife: Math.random() > 0.5
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
						if (y2 === 0 && x2 === 0) continue
						if (!cells[y + y2]?.[x + x2]) continue

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

	const [cellSize, setCellSize] = useState(20)

	useEffect(() => {
		const onMouseWheel = (event: WheelEvent) => {
			if (event.deltaY < 0) setCellSize(prevState => prevState + 5)
			if (event.deltaY > 0)
				setCellSize(prevState =>
					prevState - 2 <= 1 ? prevState : prevState - 2
				)
		}

		window.addEventListener('wheel', onMouseWheel)
		return () => window.removeEventListener('wheel', onMouseWheel)
	}, [])

	const [pivotX, setPivotX] = useState<number>(0)
	const [pivotY, setPivotY] = useState<number>(0)

	const containerWidth = options.width * cellSize
	const containerHeight = options.height * cellSize

	const x = window.innerWidth / 2 - containerWidth / 2
	const y = window.innerHeight / 2 - containerHeight / 2

	const dragStart = useRef<boolean>(false)
	const mouseXBasePosition = useRef<number>(0)
	const mouseYBasePosition = useRef<number>(0)

	const onMouseDown: MouseEventHandler = event => {
		if (dragStart.current) return
		dragStart.current = true

		mouseXBasePosition.current = event.clientX
		mouseYBasePosition.current = event.clientY
	}

	const onMouseMove: MouseEventHandler = event => {
		if (!dragStart.current) return

		const newX = event.clientX
		const newY = event.clientY

		const deltaX = newX - mouseXBasePosition.current
		const deltaY = newY - mouseYBasePosition.current

		setPivotX(prevState => prevState - deltaX)
		setPivotY(prevState => prevState - deltaY)

		mouseXBasePosition.current = newX
		mouseYBasePosition.current = newY
	}

	const onMouseUp = () => {
		if (!dragStart.current) return
		dragStart.current = false
	}

	return (
		<Stage
			className={styles.board}
			width={window.innerWidth}
			height={window.innerHeight}
			options={{ backgroundColor: 0x2b2b2b }}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
		>
			<Container
				x={x}
				y={y}
				width={containerWidth}
				height={containerHeight}
				pivot={{ x: pivotX, y: pivotY }}
			>
				{cells.map(row =>
					row.map(cell => (
						<Cell
							cell={cell}
							size={cellSize}
							boardWidth={options.width}
							boardHeight={options.height}
							stop={stop}
							updateCell={updateCell}
							key={cell.id}
						/>
					))
				)}
			</Container>
		</Stage>
	)
}
