import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import routes from './pages/components/routes'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProfileContext } from './context/profileContext'

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
