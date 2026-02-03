import React from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import type { NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAIStore } from '@/store/useAIStore';
import AgentNode from './components/AgentNode';
import { PlayCircle, Plus, LayoutGrid, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nodeTypes: NodeTypes = {
    agent: AgentNode,
};

const AIPage: React.FC = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useAIStore();

    return (
        <div className="h-[calc(100vh-180px)] w-full flex flex-col rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative">
            {/* Top Bar inside Canvas Area */}
            <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                        AI Orchestrator <Zap className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                    </h1>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Research & Code Pipeline</p>
                </div>

                <div className="flex gap-3 pointer-events-auto">
                    <div className="flex bg-slate-900/80 backdrop-blur-md rounded-2xl p-1 border border-slate-800 shadow-xl">
                        <button className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Canvas</button>
                        <button className="px-6 py-2 rounded-xl text-slate-500 text-xs font-black uppercase tracking-widest hover:text-slate-300">Agents</button>
                    </div>
                    <Button
                        className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl p-3 aspect-square shadow-xl shadow-emerald-500/20"
                        onClick={() => { }}
                    >
                        <PlayCircle className="w-6 h-6 fill-white/20" />
                    </Button>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-4">
                <Button className="w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/40">
                    <Plus className="w-7 h-7" />
                </Button>
                <Button variant="secondary" className="w-14 h-14 rounded-2xl bg-slate-900 border-slate-800 shadow-2xl text-slate-400 hover:text-white">
                    <LayoutGrid className="w-6 h-6" />
                </Button>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-slate-950"
            >
                <Background
                    color="#1e293b"
                    gap={24}
                />
                <Controls
                    className="bg-slate-900 border-slate-800 !shadow-none !rounded-xl overflow-hidden"
                    showInteractive={false}
                />
                <MiniMap
                    className="!bg-slate-900/50 !border-slate-800 !rounded-2xl !backdrop-blur-sm !bottom-6 !left-6"
                    maskColor="rgba(2, 6, 23, 0.7)"
                    nodeColor="#111827"
                />
            </ReactFlow>

            {/* Connection Info footer */}
            <div className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-white text-xs font-black uppercase tracking-widest">Active Connection</p>
                        <p className="text-slate-500 text-[10px] font-bold">Research Link Established (Animated)</p>
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="text-right">
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Latency</p>
                        <p className="text-white text-xs font-black">124ms</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Tokens/sec</p>
                        <p className="text-blue-400 text-xs font-black">45.2</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIPage;
