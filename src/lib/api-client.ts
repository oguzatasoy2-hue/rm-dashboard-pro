/**
 * API Client Interface
 */

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

export interface Recommendation {
    id: string;
    category: string;
    impact: "High" | "Medium" | "Low";
    title: string;
    description: string;
    actioned: boolean;
}

export const apiClient = {
    async getMarketTrends(): Promise<MarketData> {
        const res = await fetch('/api/market/trends', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch market trends');
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
