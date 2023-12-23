import Screen from '../Pages/Screen/Screen'
import Home from '../Pages/Home/Home'
import Report from '../Pages/Analytic/Analytic'
import Accident from '../Pages/Accident/Accident'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/screen',
    element: <Screen></Screen>,
  },
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/reports',
    element: <Report></Report>,
  },
  {
    path: '/accidents',
    element: <Accident></Accident>,
  },
])

const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
