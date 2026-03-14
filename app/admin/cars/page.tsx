import { Plus, Search } from "lucide-react";

export default function ManagingCarsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Manage Cars</h2>
                    <p className="text-slate-400 text-sm mt-1">View, edit, or add new vehicles to the platform.</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-xl font-semibold transition-colors">
                    <Plus className="h-4 w-4" />
                    Add New Car
                </button>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search cars..."
                            className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-64 transition-colors"
                        />
                    </div>
                </div>
                <div className="p-8 text-center">
                    <p className="text-slate-500">The car inventory list will be displayed here.</p>
                </div>
            </div>
        </div>
    );
}
