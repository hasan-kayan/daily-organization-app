import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowDown, TrendingDown } from 'lucide-react';

const data = [
    { name: 'Mon', weight: 75.8 },
    { name: 'Tue', weight: 75.4 },
    { name: 'Wed', weight: 75.2 },
    { name: 'Thu', weight: 75.0 },
    { name: 'Fri', weight: 74.8 },
    { name: 'Sat', weight: 74.6 },
    { name: 'Sun', weight: 74.5 },
];

const WeightTracker: React.FC = () => {
    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Weight Tracker</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">74.5</span>
                        <span className="text-slate-500 text-sm font-medium">kg</span>
                        <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full ml-2">
                            <ArrowDown className="w-3 h-3" />
                            <span className="text-[10px] font-bold">1.2kg loss</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-slate-800/40 rounded-xl">
                    <button className="px-4 py-1.5 text-[10px] font-bold bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20">WEEK</button>
                    <button className="px-4 py-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-200 transition-colors">MONTH</button>
                </div>
            </div>

            <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#101922', border: '1px solid #1e293b', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="weight"
                            stroke="#2563eb"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorWeight)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-4 px-2">
                {['MON', 'WED', 'FRI', 'SUN'].map((day) => (
                    <span key={day} className="text-[10px] text-slate-500 font-bold">{day}</span>
                ))}
            </div>
        </div>
    );
};

export default WeightTracker;
