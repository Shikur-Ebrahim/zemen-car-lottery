import { Car, Ticket, Trophy } from "lucide-react";
import { getActiveLotteries, getPaymentMethods } from "../../lib/firebase/firestore";
import CarLotteryCard from "../../components/user/CarLotteryCard";
import CloudinaryImage from "../../components/ui/CloudinaryImage";
import CopyableText from "../../components/user/CopyableText";
import AnimatedPaymentBar from "../../components/user/AnimatedPaymentBar";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
    const allLotteries = await getActiveLotteries(40); // Fetch more to have enough for marquee
    const paymentMethods = await getPaymentMethods();

    const cbe = paymentMethods.find(m => m.id === 'cbe' && m.isActive);
    const telebirr = paymentMethods.find(m => m.id === 'telebirr' && m.isActive);

    // Sort lotteries: Active ones first, Closed ones last
    const sortedLotteries = [...allLotteries].sort((a, b) => {
        const aIsClosed = new Date(a.drawDate).getTime() <= Date.now() || a.status === 'completed';
        const bIsClosed = new Date(b.drawDate).getTime() <= Date.now() || b.status === 'completed';

        if (aIsClosed && !bIsClosed) return 1;
        if (!aIsClosed && bIsClosed) return -1;
        return 0;
    });

    const displayLotteries = sortedLotteries.slice(0, 15);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500/30 selection:text-orange-950 font-sans pb-24 md:pb-12">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                            <Car className="h-6 w-6" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                                Zemen
                            </h2>
                            <p className="text-[10px] font-bold tracking-[0.1em] text-orange-500 mt-0.5">
                                Car lottery
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        <nav className="flex items-center gap-6 text-sm font-bold text-slate-500">
                            <a href="#" className="hover:text-orange-500 transition-colors">How it works</a>
                            <a href="#" className="hover:text-orange-500 transition-colors">Winners</a>
                            <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
                        </nav>
                        <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-md active:scale-95">
                            Login
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 pb-8 md:px-8 lg:px-12">

                {/* Animated Payment Info Bar - Flush with Top Navigation */}
                <AnimatedPaymentBar>
                    <section className="mb-8 bg-white border-y sm:border border-slate-200 shadow-sm overflow-hidden mx-[-1rem] sm:mx-0">
                        <div className="py-2 sm:py-3 border-b border-slate-50 bg-slate-50/50 text-center">
                            <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-wide">
                                Zemen Lottery Official Account
                            </span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-slate-100">
                            {/* CBE (Left) */}
                            {cbe && (
                                <div className="p-4 sm:p-8 flex flex-col gap-3 h-full">
                                    <div className="flex items-center gap-3 sm:gap-6">
                                        <div className="h-12 w-12 sm:h-20 sm:w-20 relative flex-shrink-0 bg-slate-50 border border-slate-100 p-1">
                                            {cbe.logoId ? (
                                                <CloudinaryImage
                                                    src={cbe.logoId}
                                                    alt="CBE Logo"
                                                    fill
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-slate-300">Cbe</div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] sm:text-[12px] font-medium text-slate-500 truncate leading-tight mb-1">{cbe.accountHolderName}</p>
                                            <CopyableText text={cbe.accountNumber} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* telebirr (Right) */}
                            {telebirr && (
                                <div className="p-4 sm:p-8 flex flex-col gap-3 h-full">
                                    <div className="flex items-center gap-3 sm:gap-6">
                                        <div className="h-12 w-12 sm:h-20 sm:w-20 relative flex-shrink-0 bg-slate-50 border border-slate-100 p-1">
                                            {telebirr.logoId ? (
                                                <CloudinaryImage
                                                    src={telebirr.logoId}
                                                    alt="telebirr Logo"
                                                    fill
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-slate-300 leading-none text-center">telebirr</div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] sm:text-[12px] font-medium text-slate-500 truncate leading-tight mb-1">{telebirr.accountHolderName}</p>
                                            <CopyableText text={telebirr.accountNumber} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </AnimatedPaymentBar>

                {/* Lottery Grid */}
                <section className="mb-20">
                    {displayLotteries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {displayLotteries.map((lottery) => (
                                <CarLotteryCard key={lottery.id} lottery={lottery} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ticket className="h-10 w-10 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400">No active lotteries at the moment</h3>
                            <p className="text-slate-300">Check back later for new exciting car draws!</p>
                        </div>
                    )}
                </section>
            </main>

        </div>
    );
}
