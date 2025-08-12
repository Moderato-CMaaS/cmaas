import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard'
import ApiKeyManagement from '@/pages/ApiKeyManagement'
import PolicyManagement from '@/pages/PolicyManagement'
import UsageAnalytics from '@/pages/UsageAnalytics'
import Billing from '@/pages/Billing'
import Settings from '@/pages/Settings'

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
      {
        path: 'policies',
        element: <PolicyManagement />,
      },
      {
        path: 'analytics',
        element: <UsageAnalytics />,
      },
      {
        path: 'billing',
        element: <Billing />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
