// src/data/mock.ts
export type YieldPositioningData = {
    currentHotelAdr: number;
    currentCompSetAdr: number;
    currency: "€" | "$" | "£";
    chartData: {
        timestamp: string;
        hotelPrice: number;
        compSetAvgPrice: number;
    }[];
};

export const generateMockYieldData = (offsetWeeks: number): YieldPositioningData => {
    const baseAdr = 154 + (offsetWeeks * 12); // Price goes up in the future
    const compAdr = 141 + (offsetWeeks * 8); // Compset goes up slower

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (offsetWeeks * 7));

    const chartData = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dateStr = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

        // Add some random noise
        chartData.push({
            timestamp: dateStr,
            hotelPrice: baseAdr + (Math.floor(Math.random() * 20) - 10),
            compSetAvgPrice: compAdr + (Math.floor(Math.random() * 15) - 7),
        });
    }

    return {
        currentHotelAdr: baseAdr,
        currentCompSetAdr: compAdr,
        currency: '€',
        chartData
    };
};

// --- MARKET INSIGHT MOCK ---
export const generateMarketData = () => {
    const data = [];
    const startDay = new Date();
    for (let i = 0; i < 14; i++) {
        const current = new Date(startDay);
        current.setDate(startDay.getDate() + i);
        const dateStr = current.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

        // Simulate event spike around day 6
        const isEvent = i === 6;
        const baseDemand = 40 + Math.random() * 20;
        const baseSearch = 50 + Math.random() * 25;

        data.push({
            date: dateStr,
            searchVolume: isEvent ? 95 : Math.floor(baseSearch),
            marketDemand: isEvent ? 85 : Math.floor(baseDemand),
            hasEvent: isEvent,
            eventName: isEvent ? "Bordeaux Wine Fest" : null,
        });
    }
    return data;
};

// --- FORECASTING MOCK ---
export interface ForecastData {
    date: string;
    isWeekend: boolean;
    occupancy: number;
    roomsSold: number;
    price: string;
    wtp: string;
    pace: number;
    demand: string;
    event: string | null;
}

export const generateForecastingData = (): ForecastData[] => {
    const data = [];
    const startDay = new Date();
    for (let i = 0; i < 30; i++) {
        const current = new Date(startDay);
        current.setDate(startDay.getDate() + i);
        const dateStr = current.toLocaleDateString("en-GB", { weekday: 'short', day: "2-digit", month: "short" });

        // Core logic mockup
        const isWeekend = [0, 6].includes(current.getDay());
        const baseOcc = isWeekend ? 0.85 : 0.60;
        const occ = Math.min(1.0, baseOcc + (Math.random() * 0.2 - 0.1));
        const price = isWeekend ? 175 + (Math.random() * 20) : 135 + (Math.random() * 10);
        const pace = Math.floor(Math.random() * 15) - 5; // -5 to +10
        const wtp = price * (1 + (Math.random() * 0.15)); // Willingness to pay is slightly higher

        data.push({
            date: dateStr,
            isWeekend,
            occupancy: parseFloat((occ * 100).toFixed(1)),
            roomsSold: Math.floor(50 * occ), // Assuming 50 rooms total
            price: price.toFixed(0),
            wtp: wtp.toFixed(0),
            pace: pace,
            demand: pace > 5 ? 'High' : pace < 0 ? 'Low' : 'Normal',
            event: (i === 12 || i === 13) ? "Regional Fest" : null,
        });
    }
    return data;
};

// --- PARITY MOCK ---
export interface ParityData {
    id: string;
    checkin: string;
    ota: string;
    directPrice: number;
    otaPrice: number;
    isUndercut: boolean;
    diffPerc: number;
    diffAmount: number;
}

export const generateParityData = (): ParityData[] => {
    const data = [];
    const startDay = new Date();

    // Create 15 instances of parity scans
    for (let i = 0; i < 15; i++) {
        const current = new Date(startDay);
        current.setDate(startDay.getDate() + Math.floor(Math.random() * 30)); // Search random future dates
        const dateStr = current.toLocaleDateString("en-GB", { weekday: 'short', day: "2-digit", month: "short" });

        // Core logic mockup - 30% chance of OTA undercutting
        const isUndercut = Math.random() < 0.35;
        const directPrice = 145 + Math.floor(Math.random() * 40);
        const otaMargin = isUndercut ? (Math.random() * 0.15 + 0.05) : 0; // 5% to 20% cheaper
        const otaPrice = directPrice * (1 - otaMargin);

        const otaList = ["Booking.com", "Expedia", "Agoda", "Trip.com"];

        data.push({
            id: `scn_${Math.random().toString(36).substr(2, 9)}`,
            checkin: dateStr,
            ota: otaList[Math.floor(Math.random() * otaList.length)],
            directPrice: directPrice,
            otaPrice: otaPrice,
            isUndercut: isUndercut,
            diffPerc: isUndercut ? otaMargin * 100 : 0,
            diffAmount: isUndercut ? directPrice - otaPrice : 0,
        });
    }

    // Sort to put the most critical parity issues first
    return data.sort((a, b) => b.diffAmount - a.diffAmount);
};

// --- STR BENCHMARK MOCK ---
export const strRadarData = [
    { subject: 'Occupancy', hotel: 85, compset: 78, fullMark: 100 },
    { subject: 'ADR', hotel: 92, compset: 85, fullMark: 100 },
    { subject: 'RevPAR', hotel: 88, compset: 75, fullMark: 100 },
    { subject: 'TRevPAR', hotel: 70, compset: 82, fullMark: 100 },
    { subject: 'GOPPAR', hotel: 80, compset: 70, fullMark: 100 },
    { subject: 'Direct %', hotel: 65, compset: 55, fullMark: 100 },
];

