"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword, isUserAdmin } from "../../../lib/firebase/auth";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (isUserAdmin(userCredential.user)) {
                router.push("/admin");
            } else {
                // Not an admin, sign them out immediately
                await auth.signOut();
                setError("Access denied. You do not have admin privileges.");
            }
        } catch (err: any) {
            console.error(err);
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-slate-950 z-0" />

            <div className="relative z-10 w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg text-slate-950 mb-6">
                        <Lock className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
                    <p className="text-slate-400 text-sm mt-2">Sign in to manage Zemen Car Lottery</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                placeholder="admin@zemen.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? "Signing in..." : "Sign In to Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
