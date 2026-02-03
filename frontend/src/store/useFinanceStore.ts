import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Asset {
    id: string;
    name: string;
    symbol: string;
    amount: number;
    value: number;
    change: number;
    type: 'crypto' | 'stock' | 'etf' | 'cash';
    imageUrl?: string;
}

export interface Transaction {
    id: string;
    date: string;
    type: 'income' | 'outcome';
    category: string;
    amount: number;
    description: string;
}

interface FinanceState {
    totalNetWorth: number;
    assets: Asset[];
    transactions: Transaction[];
    addAsset: (asset: Asset) => void;
    updateAsset: (id: string, updates: Partial<Asset>) => void;
    addTransaction: (transaction: Transaction) => void;
}

const initialAssets: Asset[] = [
    {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 0.45,
        value: 30520.10,
        change: 2.45,
        type: 'crypto',
    },
    {
        id: '2',
        name: 'Apple Inc.',
        symbol: 'AAPL',
        amount: 120,
        value: 22440.00,
        change: -0.82,
        type: 'stock',
        imageUrl: 'https://logo.clearbit.com/apple.com',
    },
    {
        id: '3',
        name: 'Vanguard S&P 500',
        symbol: 'VOO',
        amount: 45.2,
        value: 18920.45,
        change: 0.15,
        type: 'etf',
        imageUrl: 'https://logo.clearbit.com/vanguard.com',
    },
];

export const useFinanceStore = create<FinanceState>()(
    persist(
        (set) => ({
            totalNetWorth: 342850.42,
            assets: initialAssets,
            transactions: [],
            addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
            updateAsset: (id, updates) => set((state) => ({
                assets: state.assets.map(a => a.id === id ? { ...a, ...updates } : a)
            })),
            addTransaction: (transaction) => set((state) => ({
                transactions: [transaction, ...state.transactions],
                totalNetWorth: state.totalNetWorth + (transaction.type === 'income' ? transaction.amount : -transaction.amount)
            })),
        }),
        {
            name: 'finance-storage',
        }
    )
);

