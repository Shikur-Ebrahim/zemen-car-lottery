import { Search } from "lucide-react";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Registered Users</h2>
                <p className="text-slate-400 text-sm mt-1">View and manage all user accounts on the platform.</p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, phone or email..."
                            className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-72 transition-colors"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select className="bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300 px-3 py-2 outline-none focus:border-emerald-500/30">
                            <option>All Users</option>
                            <option>Active</option>
                            <option>Banned</option>
                        </select>
                    </div>
                </div>

                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800/50 text-xs uppercase text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">User Details</th>
                            <th className="px-6 py-4 font-medium">Tickets Purchased</th>
                            <th className="px-6 py-4 font-medium">Total Spent</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        <tr className="hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-white">Abebe Kebede</div>
                                <div className="text-xs text-slate-500">+251 91 123 4567</div>
                            </td>
                            <td className="px-6 py-4">12</td>
                            <td className="px-6 py-4">ETB 3,588</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-blue-400 hover:underline">View</button>
                            </td>
                        </tr>
                        {/* Add more static rows for preview as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
