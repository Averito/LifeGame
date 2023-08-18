export interface CellProps {
	cell: ICell
	boardWidth: number
	boardHeight: number
	stop: boolean
	updateCell: (cell: ICell) => void
}

export interface ICell {
	id: number
	isLife: boolean
	color: string | 'random'
}
