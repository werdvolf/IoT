import Screen from '../Pages/Screen/Screen'
import Home from '../Pages/Home/Home'
import Report from '../Pages/Analytic/Analytic'
import Accident from '../Pages/Accident/Alert'
import Recipe from '../Pages/Recipe/Recipe'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MiniDrawer from '../UI/MiniDrawer/MiniDrawer'
import ErrorBoundary from '../Pages/ErrorBoundary/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MiniDrawer />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/screen',
        element: <Screen />,
      },
      {
        path: '/reports',
        element: <Report />,
      },
      {
        path: '/accidents',
        element: <Accident />,
      },
      { path: '/recipe', element: <Recipe /> },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
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
