import { MarketInsight, ForecastDay, ParityScan, BenchmarkIndex, ComparisonData, MarketEventsResponse, MarketPulseData, DemandDay, NegotiationLog, Recommendation, MarketData } from "./api-client";

/**
 * Mock Data Service
 * Centralized logic for generated data to avoid internal fetch overhead in RSCs.
 */

export const mockDataService = {
    getMarketTrends(): MarketData {
        const trends = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (7 - i));
            return {
                date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
                average_daily_rate: Math.round(60 + Math.random() * 20),
                comp_set_adr: Math.round(55 + Math.random() * 15),
                occupancy_rate: Math.round(70 + Math.random() * 25),
                competitor_index: Number((0.9 + Math.random() * 0.2).toFixed(2)),
            };
        });

        return {
            trends,
            competitors: [
                { name: "Hôtel de la Plage", price: 68 },
                { name: "Grand Hôtel", price: 72 },
                { name: "Villa Resort", price: 65 },
                { name: "Blue Bay Inn", price: 59 },
            ],
            summary: {
                current_demand: "Strong momentum for the upcoming weekend. Compset average rising.",
                price_evolution: "Stable position at the median. Opportunity to increase weekend base by 4%.",
                recommendation_brief: "Optimize mid-week parity to capture hidden business demand."
            },
            market_info: {
                hotel_name: "Provençal"
            }
        };
    },

    getMarketInsight(): MarketInsight[] {
        return Array.from({ length: 14 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return {
                date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
                searchVolume: Math.floor(60 + Math.random() * 30),
                marketDemand: Math.floor(50 + Math.random() * 40),
                hasEvent: i === 7 || i === 12
            };
        });
    },

    getForecast(): ForecastDay[] {
        return Array.from({ length: 14 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const dayOfWeek = date.getDay();
            const demand: "Low" | "Medium" | "High" = isWeekend ? "High" : (dayOfWeek === 5 ? "Medium" : "Low");

            return {
                date: date.toISOString().split('T')[0],
                occupancy: Math.floor(60 + Math.random() * 35),
                price: Math.round(120 + Math.random() * 40),
                wtp: Math.round(130 + Math.random() * 50),
                pace: Number((0.8 + Math.random() * 0.4).toFixed(2)),
                demand,
                isWeekend,
                event: i === 5 ? "Local Festival" : undefined
            };
        });
    },

    getParityScans(): ParityScan[] {
        const otas = ["Booking.com", "Expedia", "Agoda", "Hotelbeds"];
        return otas.map((ota, i) => {
            const directPrice = 120;
            const otaPrice = i === 1 ? 114 : (i === 2 ? 112 : 120);
            return {
                id: i + 1,
                ota,
                checkin: "2026-06-15",
                directPrice,
                otaPrice,
                diffPerc: ((otaPrice - directPrice) / directPrice) * 100,
                diffAmount: otaPrice - directPrice,
                isUndercut: otaPrice < directPrice
            };
        });
    },

    getBenchmark(): BenchmarkIndex[] {
        return [
            { subject: 'Price', hotel: 85, compset: 78, fullMark: 100 },
            { subject: 'Service', hotel: 92, compset: 88, fullMark: 100 },
            { subject: 'Demand Capture', hotel: 78, compset: 82, fullMark: 100 },
            { subject: 'Velocity', hotel: 88, compset: 80, fullMark: 100 },
            { subject: 'Reputation', hotel: 95, compset: 90, fullMark: 100 },
        ];
    },

    getComparison(): ComparisonData {
        const competitors = [
            { name: "Hôtel de la Paix", segment: "Midscale" },
            { name: "Grand Palais", segment: "Upscale" },
            { name: "Petit Auberge", segment: "Economy" },
            { name: "Villa Riviera", segment: "Boutique" }
        ];

        const timeline = Array.from({ length: 14 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const d = date.toISOString().split('T')[0];
            return {
                date: d,
                provençal: Math.round(120 + Math.random() * 20),
                "Hôtel de la Paix": Math.round(115 + Math.random() * 15),
                "Grand Palais": Math.round(140 + Math.random() * 30),
                "Petit Auberge": Math.round(90 + Math.random() * 10),
                "Villa Riviera": Math.round(130 + Math.random() * 25)
            };
        });

        return {
            summary: {
                positioning_index: 104.2,
                our_average: 124,
                market_average: 119,
                most_expensive_comp: "Grand Palais"
            },
            competitors,
            timeline
        };
    },

    getEvents(): MarketEventsResponse {
        const events: any[] = [
            {
                id: "evt-101",
                title: "Grand Prix de Monaco",
                location: "Monaco",
                startDate: "2026-05-24",
                endDate: "2026-05-27",
                impact: "Very High",
                category: "Sports",
                attendance: 200000,
                distanceFromHotel: "12km",
                source: "Official Calendar"
            },
            {
                id: "evt-102",
                title: "Festival de Jazz",
                location: "Vieux Nice",
                startDate: "2026-07-15",
                endDate: "2026-07-20",
                impact: "High",
                category: "Music",
                attendance: 45000,
                distanceFromHotel: "2km",
                source: "City Hall"
            }
        ];

        return {
            city: "Nice",
            district: "Old Town",
            hotel_context: "Urban Boutique",
            events,
            summary: {
                next_30_days: 12,
                peak_impact_date: "2026-05-25",
                total_estimated_attendance: 285000
            }
        };
    },

    getPulse(): MarketPulseData {
        return {
            score: 78,
            trend: "+4.2%",
            pillars: [
                { category: "Service", our_score: 88, comp_avg: 82, delta: 6, priority: "low" },
                { category: "Location", our_score: 95, comp_avg: 90, delta: 5, priority: "low" },
                { category: "Value", our_score: 72, comp_avg: 75, delta: -3, priority: "high" },
                { category: "Rooms", our_score: 84, comp_avg: 80, delta: 4, priority: "medium" }
            ],
            competitor_insights: [
                { hotel: "Grand Palais", strength: "Luxury Spa", impact: 15, mention_rate: "High" },
                { hotel: "Petit Auberge", strength: "Budget Friendly", impact: -10, mention_rate: "Medium" }
            ],
            investment_roadmap: [
                { item: "Room Refresh", cost_estimate: "€50k", revenue_potential: "€15k/y", urgency: "MEDIUM", logic: "Improve guest rating for superior segment" },
                { item: "Digital Concierge", cost_estimate: "€5k", revenue_potential: "€2k/y", urgency: "LOW", logic: "Streamline operations" }
            ],
            cash_cow: {
                item: "Business Travelers",
                strength: "High repeat rate",
                advice: "Leverage loyalty for direct booking"
            }
        };
    },

    getDemandCalendar(): DemandDay[] {
        const days = 35;
        return Array.from({ length: days }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);

            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const baseDemand = isWeekend ? 75 : 45;
            const randomFlux = Math.floor(Math.random() * 20);
            const demandValue = Math.min(100, baseDemand + randomFlux);

            return {
                date: date.toISOString().split('T')[0],
                demand: demandValue,
                velocity: Math.floor(demandValue * 0.8),
                occupancy: Math.min(100, Math.floor(demandValue * 0.9)),
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNum: date.getDate(),
                isWeekend
            };
        });
    },

    getNegotiations(): NegotiationLog[] {
        return [
            {
                id: "NEG-001",
                ota: "Booking.com",
                status: "resolved",
                issue: "Undercut Detected (-12€)",
                action: "Contractual parity reminder sent",
                result: "Price corrected by OTA",
                timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
                impact: "+450€ Recouped"
            },
            {
                id: "NEG-002",
                ota: "Expedia",
                status: "active",
                issue: "Hidden member discount (-5%)",
                action: "AI negotiation in progress",
                result: "Awaiting OTA response",
                timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
                impact: "Est. 1,200€ Risk"
            },
            {
                id: "NEG-003",
                ota: "Agoda",
                status: "resolved",
                issue: "Taxes not included in public rate",
                action: "Automated ticket #8892",
                result: "Listing updated",
                timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
                impact: "+120€ Recouped"
            }
        ];
    },

    getRecommendations(): Recommendation[] {
        return [
            { id: "rec-1", category: "Pricing", impact: "High", title: "Increase Weekend Base Rate", description: "Demand is 15% higher than same period last year.", actioned: false },
            { id: "rec-2", category: "Channel", impact: "Medium", title: "Close Wholesale Channels", description: "B2B rates are leaking to retail.", actioned: false }
        ];
    }
};
