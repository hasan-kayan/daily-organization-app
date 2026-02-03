import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const data = [
    { name: 'Essential', value: 1800, color: '#2563eb' },
    { name: 'Lifestyle', value: 600, color: '#10b981' },
    { name: 'Other', value: 120, color: '#fb923c' },
];

const SpendAnalyzer: React.FC = () => {
    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Spend Analyzer</h2>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                    <Info className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#101922', border: '1px solid #1e293b', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff', fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Total</span>
                        <span className="text-xs font-black text-white">$2.5k</span>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-3">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                                    style={{ backgroundColor: item.color }}
                                />
                                <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{item.name}</p>
                            </div>
                            <p className="text-sm font-black text-white">${item.value.toLocaleString()}</p>
                        </div>
                    ))}
                    <Button className="w-full mt-4 bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-xs font-bold py-5 rounded-2xl border border-slate-700/50 transition-all">
                        View Spending Breakdown
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SpendAnalyzer;
