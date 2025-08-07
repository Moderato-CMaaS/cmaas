import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard'
import ApiKeyManagement from '@/pages/ApiKeyManagement'

const router = createBrowserRouter([
  {
    path: '/',  // Base path
    element: <Layout />,  // Parent component for all routes
    children: [
      {
        index: true,
        element: <Dashboard />,  // Default route (/)
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'api-keys',
        element: <ApiKeyManagement />,
      },
      //add the other paths here
      //ex: billing , policy, usage etc.
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
