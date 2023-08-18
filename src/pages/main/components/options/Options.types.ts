import { IBoardOptions } from '@pages/main/components/board'

export interface OptionsProps {
	accept: (options: IBoardOptions) => void
	options: IBoardOptions
}
