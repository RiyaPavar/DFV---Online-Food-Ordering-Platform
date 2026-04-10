'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

    // Don't protect /admin/login
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    if (!token) {
      router.replace('/admin/login');
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking admin access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
