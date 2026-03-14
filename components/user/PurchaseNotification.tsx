"use client";

import { PartyPopper } from "lucide-react";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lotteryId: string;
    ticketPrice: number | string;
    bundlePrices?: Record<string, number>;
}

export default function PurchaseNotification({ isOpen, onClose, lotteryId, ticketPrice, bundlePrices }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-sm transform animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-b from-orange-400 to-orange-600 h-40 flex items-center justify-center p-6 text-center">
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase drop-shadow-xl">
                        Good Luck!
                    </h3>
                </div>

                <div className="p-8 text-center border-t-8 border-white -mt-4 relative z-10 rounded-t-[2.5rem] bg-white">

                    <div className="space-y-4 mb-8 text-center">
                        <p className="text-slate-500 font-bold text-sm leading-relaxed">
                            Buy more than one ticket to increase your winning chances! There is no limit.
                        </p>

                        {/* Pricing Details */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-black text-slate-900 uppercase">1 Ticket</span>
                                <span className="text-sm font-black text-orange-600">ETB {ticketPrice}</span>
                            </div>
                            {bundlePrices && Object.entries(bundlePrices).map(([count, price]) => (
                                <div key={count} className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/50">
                                    <span className="text-xs font-black text-slate-900 uppercase">{count} Tickets</span>
                                    <span className="text-sm font-black text-orange-600">ETB {price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-orange-600 font-black text-sm leading-relaxed italic">
                            Zemen Lottery gives special discounts for more than one ticket purchase.
                        </p>
                    </div>

                    <Link
                        href={`/lottery/${lotteryId}/buy`}
                        className="block w-full text-center bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-black py-5 rounded-2xl shadow-lg shadow-orange-500/30 uppercase tracking-widest text-sm"
                    >
                        Buy Tickets Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
