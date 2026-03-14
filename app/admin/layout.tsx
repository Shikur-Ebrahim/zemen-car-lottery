import type { Metadata } from 'next'
import AdminAuthGuard from '../../components/admin/AdminAuthGuard'
import AdminSidebar from '../../components/admin/AdminSidebar'

export const metadata: Metadata = {
    title: 'Admin Dashboard | Zemen Car Lottery',
    description: 'Manage lottery rounds, cars, and users for Zemen Car Lottery',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
            <AdminAuthGuard>
                <AdminSidebar />

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center px-6 lg:px-8">
                        <h1 className="text-lg font-semibold text-white">Dashboard Overview</h1>
                    </header>
                    <div className="flex-1 overflow-auto p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </AdminAuthGuard>
        </div>
    )
}
