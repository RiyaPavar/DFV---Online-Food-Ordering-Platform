import { LogOut, LayoutDashboard, Utensils, ClipboardList, ShieldCheck, Users,XCircle } from 'lucide-react';

export default function AdminSidebar({
  activePage,
  setActivePage,
  role,
  adminName,
  handleLogout,
  sidebarOpen,
  setSidebarOpen
}) {
  const navLinks = [
    { label: 'Dashboard', value: 'dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Food Items', value: 'items', icon: <Utensils size={18} /> },
    { label: 'Orders', value: 'orders', icon: <ClipboardList size={18} /> },
    ...(role === 'master'
      ? [
        { label: 'Admin Requests', value: 'requests', icon: <ShieldCheck size={18} /> },
        { label: 'Manage Admins', value: 'manage-admins', icon: <Users size={18} /> },
      ]
      : []),
  ];

  return (
    <aside
      className={`fixed md:relative z-30 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-64'}`}
    >
      <div className="h-full flex flex-col p-6 w-64">
        {/* Header with improved close button */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-red-600 whitespace-nowrap">DESHI FOOD VILLA</h2>
          {/* Minimal close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden ml-2 text-gray-500 hover:text-red-600 transition-all hover:rotate-90 duration-300"
            aria-label="Close menu"
          >
            <XCircle size={22} strokeWidth={2.2} />
          </button>

        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {navLinks.map(({ label, value, icon }) => (
              <li key={value}>
                <button
                  onClick={() => {
                    setActivePage(value);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all
                    ${activePage === value
                      ? 'bg-red-50 font-semibold text-red-600'
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-500'}`}
                >
                  <span className="text-red-500">{icon}</span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="pt-4 border-t border-gray-100">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-medium text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-400 mt-1">{role === 'master' ? 'Master Admin' : 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </footer>
      </div>
    </aside>
  );
}