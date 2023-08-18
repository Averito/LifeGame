import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { Main } from '@pages/main'
export const App = () => {
	return (
		<>
			<Main />
			<ToastContainer />
		</>
	)
}
