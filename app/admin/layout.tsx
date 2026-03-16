"use client";

import { useState } from 'react';
import AdminAuthGuard from '../../components/admin/AdminAuthGuard'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Menu } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
            <AdminAuthGuard>
                <AdminSidebar 
                    isOpen={isSidebarOpen} 
                    onClose={() => setIsSidebarOpen(false)} 
                />

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 md:px-6 lg:px-8 gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-slate-400 hover:text-white md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-white truncate">Admin Panel</h1>
                    </header>
                    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </AdminAuthGuard>
        </div>
    )
}
