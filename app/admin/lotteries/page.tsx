import { Plus } from "lucide-react";

export default function LotteryRoundsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Lottery Rounds</h2>
                    <p className="text-slate-400 text-sm mt-1">Create new lottery rounds and manage active ones.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors">
                    <Plus className="h-4 w-4" />
                    Create Round
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* Static round card */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-bl-xl border-b border-l border-emerald-500/20">
                        ACTIVE
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Round 42 - Toyota RAV4</h3>
                    <div className="space-y-2 text-sm text-slate-400">
                        <div className="flex justify-between">
                            <span>Draw Date:</span>
                            <span className="text-slate-300">Mar 30, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tickets Sold:</span>
                            <span className="text-slate-300">12,450 / 50,000</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Price per Ticket:</span>
                            <span className="text-white font-medium">ETB 299</span>
                        </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
                        <button className="text-sm text-slate-400 hover:text-white transition-colors">View Details</button>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Edit Round</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
