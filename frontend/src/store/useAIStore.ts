import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Edge, Node, OnNodesChange, OnEdgesChange, OnConnect, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';

export interface AIAgent {
    id: string;
    name: string;
    model: string;
    status: 'idle' | 'processing' | 'error';
}

interface AIState {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
}

export const useAIStore = create<AIState>()(
    persist(
        (set, get) => ({
            nodes: initialNodes,
            edges: initialEdges,
            onNodesChange: (changes) => {
                set({ nodes: applyNodeChanges(changes, get().nodes) });
            },
            onEdgesChange: (changes) => {
                set({ edges: applyEdgeChanges(changes, get().edges) });
            },
            onConnect: (connection) => {
                set({ edges: addEdge(connection, get().edges) });
            },
            setNodes: (nodes) => set({ nodes }),
            setEdges: (edges) => set({ edges }),
        }),
        {
            name: 'ai-storage',
            partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
        }
    )
);

const initialNodes: Node[] = [
    {
        id: 'research-agent',
        type: 'agent',
        position: { x: 50, y: 100 },
        data: { name: 'Research Agent', model: 'GPT-4o', status: 'processing' },
    },
    {
        id: 'code-assistant',
        type: 'agent',
        position: { x: 400, y: 250 },
        data: { name: 'Code Assistant', model: 'Claude 3.5', status: 'idle' },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: 'research-agent', target: 'code-assistant', animated: true, style: { stroke: '#137fec' } },
];
