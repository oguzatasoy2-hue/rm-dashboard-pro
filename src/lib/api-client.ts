/**
 * API Client Interface - Complete RM Suite
 */

// --- Interfaces ---

export interface MarketTrend {
    date: string;
    average_daily_rate: number;
    comp_set_adr: number;
    occupancy_rate: number;
    competitor_index: number;
}

export interface MarketData {
    trends: MarketTrend[];
    competitors: { name: string; price: number }[];
    summary: {
        current_demand: string;
        price_evolution: string;
        recommendation_brief: string;
    };
    market_info: {
        hotel_name: string;
    };
}

export interface MarketInsight {
    date: string;
    searchVolume: number;
    marketDemand: number;
    hasEvent: boolean;
}

export interface ForecastDay {
    date: string;
    occupancy: number;
    price: number;
    wtp: number;
    pace: number;
    demand: "Low" | "Medium" | "High";
    isWeekend: boolean;
    event?: string;
}

export interface ParityScan {
    id: number;
    ota: string;
    checkin: string;
    directPrice: number;
    otaPrice: number;
    diffPerc: number;
    diffAmount: number;
    isUndercut: boolean;
}

export interface BenchmarkIndex {
    subject: string;
    hotel: number;
    compset: number;
    fullMark: number;
}

export interface Recommendation {
    id: string;
    category: string;
    impact: "High" | "Medium" | "Low";
    title: string;
    description: string;
    actioned: boolean;
}

// --- Client ---

export const apiClient = {
    async getMarketTrends(): Promise<MarketData> {
        const res = await fetch('/api/market/trends', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch market trends');
        return res.json();
    },

    async getMarketInsight(): Promise<MarketInsight[]> {
        const res = await fetch('/api/market/insight', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch market insight');
        return res.json();
    },

    async getForecast(): Promise<ForecastDay[]> {
        const res = await fetch('/api/revenue/forecast', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch forecast');
        return res.json();
    },

    async getParityScans(): Promise<ParityScan[]> {
        const res = await fetch('/api/parity/scans', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch parity scans');
        return res.json();
    },

    async getBenchmark(): Promise<BenchmarkIndex[]> {
        const res = await fetch('/api/market/benchmark', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch benchmark data');
        return res.json();
    },

    async getComparison(): Promise<any> {
        const res = await fetch('/api/market/comparison', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch comparison data');
        return res.json();
    },

    async getEvents(): Promise<any> {
        const res = await fetch('/api/market/events', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch events data');
        return res.json();
    },

    async getRecommendations(): Promise<Recommendation[]> {
        const res = await fetch('/api/revenue/recommendations', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch recommendations');
        return res.json();
    },

    async sendFeedback(data: any): Promise<any> {
        const res = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to send feedback');
        return res.json();
    }
};
