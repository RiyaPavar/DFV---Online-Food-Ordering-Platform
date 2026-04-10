'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminItemsPage from './components/ItemsSection';
import OrdersSection from './components/OrdersSection';
import RequestsSection from './components/RequestsSection';
import ManageAdminsSection from './components/ManageAdminsSection';
import { Menu, X } from 'lucide-react';

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState('');
  const [role, setRole] = useState('');
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return router.push('/admin/login');

    setAdminName(localStorage.getItem('adminName'));
    setRole(localStorage.getItem('adminRole'));
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/admin/login');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard 
                title="Total Orders" 
                value="1,234" 
                icon="📦" 
                trend="up" 
                percentage="12%"
              />
              <DashboardCard 
                title="Revenue" 
                value="₹89,500" 
                icon="💰" 
                trend="up" 
                percentage="8%"
              />
              <DashboardCard 
                title="Active Items" 
                value="87" 
                icon="🍔" 
                trend="down" 
                percentage="3%"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            </div>
          </div>
        );
      case 'items':
        return <AdminItemsPage />;
      case 'orders':
        return <OrdersSection />;
      case 'requests':
        return <RequestsSection />;
      case 'manage-admins':
        return <ManageAdminsSection />;
      default:
        return <p>Page not found</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay - only shown when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        role={role}
        adminName={adminName}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main content area */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'
      }`}>
        <header className="bg-white shadow-sm z-10">
  <div className="flex items-center justify-between px-6 py-4">
    <button 
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="text-gray-500 hover:text-gray-600 md:hidden"
    >
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    <div className="flex items-center space-x-4 ml-auto"> {/* Added ml-auto here */}
      <span className="text-sm font-medium text-gray-600">Welcome, {adminName}</span>
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
        {adminName.charAt(0).toUpperCase()}
      </div>
    </div>
  </div>
</header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, trend, percentage }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`mt-4 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )}
        <span>{percentage} {trend === 'up' ? 'increase' : 'decrease'}</span>
      </div>
    </div>
  );
}