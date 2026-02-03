import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Settings, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AgentNodeData = {
    name: string;
    model: string;
    status: 'idle' | 'processing' | 'error';
};

const AgentNode = ({ data }: NodeProps<Node<AgentNodeData>>) => {
    return (
        <div className="px-4 py-4 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl min-w-[240px] group transition-all hover:border-blue-600/50">
            <Handle
                type="target"
                position={Position.Left}
                className="w-4 h-4 bg-slate-700 border-2 border-slate-950 -left-2"
            />

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em]">{data.model}</span>
                        <h3 className="text-white text-base font-black tracking-tight">{data.name}</h3>
                    </div>
                    <div className={cn(
                        "w-2.5 h-2.5 rounded-full shadow-lg",
                        data.status === 'processing' ? "bg-emerald-500 animate-pulse shadow-emerald-500/40" : "bg-slate-700"
                    )} />
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-3 mt-1">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            {data.status === 'processing' ? 'Thinking...' : 'Ready'}
                        </span>
                    </div>
                    <button className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                        <Settings className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-4 h-4 bg-blue-600 border-2 border-slate-950 -right-2 shadow-[0_0_10px_#2563eb]"
            />
        </div>
    );
};

export default memo(AgentNode);
