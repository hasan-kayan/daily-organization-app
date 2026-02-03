import React from 'react';
import NetWorthHero from './components/NetWorthHero';
import AssetList from './components/AssetList';
import SpendAnalyzer from './components/SpendAnalyzer';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tickerItems = [
    { name: 'S&P 500', change: '+0.5%', up: true },
    { name: 'BTC', change: '-1.2%', up: false },
    { name: 'ETH', change: '+2.4%', up: true },
    { name: 'NVDA', change: '+1.1%', up: true },
];

const InvestmentsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-white">Wealth & Investments</h1>
                <p className="text-slate-500 text-sm">Optimize your assets and track global growth.</p>
            </header>

            {/* Market Ticker */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {tickerItems.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 rounded-full border border-slate-800/50 whitespace-nowrap"
                    >
                        {item.up ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            {item.name} <span className={item.up ? "text-emerald-500" : "text-red-500"}>{item.change}</span>
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <NetWorthHero />
                    <SpendAnalyzer />
                </div>

                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Investment Moves</h2>
                        <Button variant="ghost" className="text-blue-500 font-bold flex items-center gap-2 hover:bg-blue-600/5">
                            <ArrowRightLeft className="w-4 h-4" /> Move Funds
                        </Button>
                    </div>
                    <AssetList />
                </div>
            </div>
        </div>
    );
};

export default InvestmentsPage;
