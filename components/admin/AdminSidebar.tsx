"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Car, Ticket, Users, PlusCircle, LogOut, CreditCard, Send } from "lucide-react";
import { auth, signOut } from "../../lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Add Lottery Car", href: "/admin/cars/add", icon: PlusCircle },
        { name: "Manage Cars", href: "/admin/cars", icon: Car },
        { name: "Lottery Rounds", href: "/admin/lotteries", icon: Ticket },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Payment Methods", href: "/admin/payments", icon: CreditCard },
        { name: "Telegram Settings", href: "/admin/settings/telegram", icon: Send },
    ];

    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-800">
                <Link href="/admin">
                    <h2 className="text-xl font-black tracking-tight text-white leading-none hover:text-emerald-400 transition-colors cursor-pointer">
                        ZEMEN <span className="text-emerald-400">ADMIN</span>
                    </h2>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
