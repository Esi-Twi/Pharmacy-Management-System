import React from 'react'
import {
  Home,
  Users,
  BarChart3,
  Package,
  FileText,
  Settings,
  Activity,
  User,
  Pill
} from 'lucide-react' // adjust if you use another icon library

function Drugs() {
  const sidebarConfig = {
    admin: {
      title: 'Admin Dashboard',
      items: [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'settings', label: 'System Settings', icon: Settings }
      ]
    },
    pharmacist: {
      title: 'Pharmacist Portal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
        { id: 'inventory', label: 'Drug Inventory', icon: Package },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'activity', label: 'Activity Log', icon: Activity },
        { id: 'profile', label: 'Profile', icon: User }
      ]
    }
  }

  // Map of all page content
  const pages = {
    overview: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Pharmacists</p>
                <p className="text-2xl font-bold text-gray-900">56</p>
              </div>
              <Pill className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$45,678</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inventory</p>
                <p className="text-2xl font-bold text-gray-900">8,921</p>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    ),
    users: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">Manage system users, roles, and permissions.</p>
          </div>
        </div>
      </div>
    ),
    analytics: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">View system analytics and performance metrics.</p>
          </div>
        </div>
      </div>
    ),
    dashboard: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Pharmacist Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <FileText className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    ),
    prescriptions: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">Manage and process patient prescriptions.</p>
          </div>
        </div>
      </div>
    ),
    inventory: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">Track and manage inventory levels.</p>
          </div>
        </div>
      </div>
    ),
    patients: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">View and manage patient information.</p>
          </div>
        </div>
      </div>
    ),
    activity: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">View recent activities and transactions.</p>
          </div>
        </div>
      </div>
    ),
    reports: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">Generate and view system reports.</p>
          </div>
        </div>
      </div>
    ),
    settings: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">Configure system settings and preferences.</p>
          </div>
        </div>
      </div>
    ),
    profile: () => (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <p className="text-gray-600">Manage your profile information.</p>
          </div>
        </div>
      </div>
    )
  }

  // Render the active page, or fallback if not found
  // const Page = pages[activeItem] || (() => <div>Page not found</div>)

  return (
    <div>
      this is the drugs page
      <pages />
    </div>
  )
}

export default Drugs
