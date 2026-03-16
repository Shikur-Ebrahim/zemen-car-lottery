"use client";

import { Car, Ticket } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../../lib/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function UserHeader() {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                        <Car className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                            {t('logo_title')}
                        </h2>
                        <p className="text-[10px] font-bold tracking-[0.1em] text-orange-500 mt-0.5">
                            {t('logo_subtitle')}
                        </p>
                    </div>
                </Link>
                <div className="flex items-center gap-2 sm:gap-3">
                    <LanguageToggle />
                    <Link 
                        href="/check-lottery" 
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                        <Ticket className="h-4 w-4" />
                        <span className="hidden xs:inline">{t('check_lottery')}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
