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

export interface ComparisonCompetitor {
    name: string;
    segment: string;
}

export interface ComparisonTimeline {
    date: string;
    provençal: number;
    [key: string]: number | string;
}

export interface ComparisonData {
    summary: {
        positioning_index: number;
        our_average: number;
        market_average: number;
        most_expensive_comp: string;
    };
    competitors: ComparisonCompetitor[];
    timeline: ComparisonTimeline[];
}

export interface MarketEvent {
    id: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    impact: "High" | "Medium" | "Low" | "Very High";
    category: string;
    attendance: number;
    distanceFromHotel: string;
    source: string;
}

export interface MarketEventsResponse {
    city: string;
    district: string;
    hotel_context: string;
    events: MarketEvent[];
    summary: {
        next_30_days: number;
        peak_impact_date: string;
        total_estimated_attendance: number;
    };
}

export interface PulsePillar {
    category: string;
    our_score: number;
    comp_avg: number;
    delta: number;
    priority: "low" | "medium" | "high";
}

export interface CompetitorInsight {
    hotel: string;
    strength: string;
    impact: number;
    mention_rate: string;
}

export interface InvestmentItem {
    item: string;
    cost_estimate: string;
    revenue_potential: string;
    urgency: "CRITICAL" | "MEDIUM" | "LOW";
    logic: string;
}

export interface DemandDay {
    date: string;
    demand: number;
    velocity: number;
    occupancy: number;
    dayName: string;
    dayNum: number;
    isWeekend: boolean;
}

export interface NegotiationLog {
    id: string;
    ota: string;
    status: "active" | "resolved" | "failed";
    issue: string;
    action: string;
    result: string;
    timestamp: string;
    impact: string;
}

export interface MarketPulseData {
    readonly score: number;
    readonly trend: string;
    readonly pillars: readonly PulsePillar[];
    readonly competitor_insights: readonly CompetitorInsight[];
    readonly investment_roadmap: readonly InvestmentItem[];
    readonly cash_cow: {
        readonly item: string;
        readonly strength: string;
        readonly advice: string;
    };
}

// --- Helpers ---

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '';
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://127.0.0.1:${process.env.PORT || 3000}`;
};

const BASE_URL = getBaseUrl();

// --- Client ---

export const apiClient = {
    async getMarketTrends(): Promise<MarketData> {
        const res = await fetch(`${BASE_URL}/api/market/trends`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch market trends');
        return res.json();
    },

    async getMarketInsight(): Promise<MarketInsight[]> {
        const res = await fetch(`${BASE_URL}/api/market/insight`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch market insight');
        return res.json();
    },

    async getForecast(): Promise<ForecastDay[]> {
        const res = await fetch(`${BASE_URL}/api/revenue/forecast`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch forecast');
        return res.json();
    },

    async getParityScans(): Promise<ParityScan[]> {
        const res = await fetch(`${BASE_URL}/api/parity/scans`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch parity scans');
        return res.json();
    },

    async getBenchmark(): Promise<BenchmarkIndex[]> {
        const res = await fetch(`${BASE_URL}/api/market/benchmark`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch benchmark data');
        return res.json();
    },

    async getComparison(): Promise<ComparisonData> {
        const res = await fetch(`${BASE_URL}/api/market/comparison`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch comparison data');
        return res.json();
    },

    async getEvents(): Promise<MarketEventsResponse> {
        const res = await fetch(`${BASE_URL}/api/market/events`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch events data');
        return res.json();
    },

    async getPulse(): Promise<MarketPulseData> {
        const res = await fetch(`${BASE_URL}/api/market/pulse`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch pulse data');
        return res.json();
    },

    async getRecommendations(): Promise<Recommendation[]> {
        const res = await fetch(`${BASE_URL}/api/revenue/recommendations`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch recommendations');
        return res.json();
    },

    async getDemandCalendar(): Promise<DemandDay[]> {
        const res = await fetch(`${BASE_URL}/api/market/demand`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch demand calendar');
        return res.json();
    },

    async getNegotiations(): Promise<NegotiationLog[]> {
        const res = await fetch(`${BASE_URL}/api/ai/negotiator`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch negotiations');
        return res.json();
    },

    async sendFeedback(data: Record<string, unknown>): Promise<{ success: boolean }> {
        const res = await fetch(`${BASE_URL}/api/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to send feedback');
        return res.json();
    }
};
