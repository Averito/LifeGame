import { ICell } from '@pages/main/components/cell'

export interface BoardProps {
	options: IBoardOptions
	stop: boolean
	reset: boolean
}

export interface IBoard {
	width: number
	height: number
	isStop: boolean
	cells: ICell[][]
}

export interface IBoardOptions {
	width: number
	height: number
	speed: number
	cellColor: string | 'random'
}
