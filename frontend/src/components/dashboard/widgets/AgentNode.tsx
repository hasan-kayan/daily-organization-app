import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Cpu, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useDashboardStore';

export type AgentNodeData = {
    name: string;
    model: string;
    status: 'idle' | 'processing' | 'error';
};

interface AgentNodeProps extends Partial<NodeProps<Node<AgentNodeData>>> {
    sectionId?: string;
    componentId?: string;
    title?: string;
    name?: string;
    model?: string;
    status?: 'idle' | 'processing' | 'error';
}

import { useAppStore } from '@/store/useAppStore';

const AgentNode: React.FC<AgentNodeProps> = (props) => {
    // Determine data source (React Flow vs Dashboard Widget)
    const name = props.data?.name || props.name || 'Assistant';
    const model = props.data?.model || props.model || 'GPT-4';
    const status = props.data?.status || props.status || 'idle';

    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();

    const handleEdit = () => {
        if (!props.sectionId || !props.componentId) {
            confirmAction(
                'Action Restricted',
                'Editing is only available for dashboard widgets.',
                () => { },
                true
            );
            return;
        }

        const newName = prompt('Agent Name:', name);
        if (newName === null) return;

        const newModel = prompt('Model:', model);
        if (newModel === null) return;

        const newStatus = confirm('Is it processing?') ? 'processing' : 'idle';

        updateComponentConfig(props.sectionId, props.componentId, {
            name: newName,
            model: newModel,
            status: newStatus
        });
    };

    return (
        <div className="px-4 py-4 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 shadow-2xl min-w-[240px] group transition-all hover:border-blue-600/50 relative">
            <Handle
                type="target"
                position={Position.Left}
                className="w-4 h-4 bg-slate-700 border-2 border-slate-950 -left-2"
            />

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em]">{model}</span>
                        <h3 className="text-white text-base font-black tracking-tight">{name}</h3>
                    </div>
                    <div className={cn(
                        "w-2.5 h-2.5 rounded-full shadow-lg",
                        status === 'processing' ? "bg-emerald-500 animate-pulse shadow-emerald-500/40" : "bg-slate-700"
                    )} />
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-slate-800 pt-3 mt-1">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            {status === 'processing' ? 'Thinking...' : 'Ready'}
                        </span>
                    </div>
                    {props.sectionId && (
                        <button
                            onClick={handleEdit}
                            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                        >
                            <Settings2 className="w-3.5 h-3.5" />
                        </button>
                    )}
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
