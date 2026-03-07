export type NicheType = "hotel" | "saas" | "ecommerce";

// ==========================================
// 🎯 ACTIVE THEME SELECTOR
// Uses environment variable for build-time tree-shaking
// ==========================================
export const ACTIVE_NICHE: NicheType = (process.env.NEXT_PUBLIC_NICHE as NicheType) || "hotel";

export const nichesInfo = {
    hotel: {
        name: "Hôtel Le Provençal - Analytics",
        description: "Advanced Revenue Management & Yield Optimization Dashboard for Hospitality",
        company: { name: "Le Provençal", logo: "LP", },
        user: { name: "Oguz Atasoy", initials: "OA", role: "Revenue Manager", },
        moduleNames: {
            yield: "Yield & Positioning",
            market: "Market Insight",
            forecast: "Forecasting",
            parity: "Rate Parity",
            str: "STR Benchmark",
            comparison: "Price Comparison",
            events: "Event Tracker",
            pulse: "Pouls Sémantique",
        },
        kpis: {
            yieldVal1: "Our ADR (Base)",
            yieldVal2: "Market Median (Compset)",
            chartLine1: "Our Hotel ADR",
            chartLine2: "Market Compset Avg",
            currency: "€",
            marketDemand: "Flight Demand",
            marketSearch: "Search Vol.",
            forecastRooms: "Rooms Sold",
            forecastPace: "Booking Pace",
            parityUndercut: "OTA Undercut Risk",
            strDirect: "Direct Booking %",
            pulseSentiment: "Guest Sentiment Score",
        }
    },
    saas: {
        name: "MetricFlow",
        description: "B2B SaaS Analytics & Churn Prediction Dashboard",
        company: { name: "Flow HQ", logo: "MF", },
        user: { name: "Sarah Tech", initials: "ST", role: "Head of Growth", },
        moduleNames: {
            yield: "MRR & Positioning",
            market: "Traffic Insight",
            forecast: "Churn Forecast",
            parity: "Competitor Pricing",
            str: "SaaS Benchmark",
            comparison: "Market Comparison",
            events: "Growth Events",
            pulse: "Signal Pulse",
        },
        kpis: {
            yieldVal1: "Our ARPU (Avg Revenue Per User)",
            yieldVal2: "Market Median (Competitors)",
            chartLine1: "Our MRR Trend",
            chartLine2: "Market Average",
            currency: "$",
            marketDemand: "Trial Signups",
            marketSearch: "Site Visits",
            forecastRooms: "Active Users",
            forecastPace: "Net Retention Pace",
            parityUndercut: "Competitor Discount Risk",
            strDirect: "Organic Acquisition %",
            pulseSentiment: "Churn Risk Score",
        }
    },
    ecommerce: {
        name: "StoreOps",
        description: "E-Commerce Revenue & Logistics Dashboard",
        company: { name: "Retail Co", logo: "SO", },
        user: { name: "Marc Data", initials: "MD", role: "Operations Lead", },
        moduleNames: {
            yield: "AOV & Positioning",
            market: "Trend Insight",
            forecast: "Inventory Forecast",
            parity: "Market Pricing",
            str: "Retail Benchmark",
            comparison: "Price Pulse",
            events: "Promo Calendar",
            pulse: "Trend Pulse",
        },
        kpis: {
            yieldVal1: "Our AOV (Base Cart)",
            yieldVal2: "Median Cart (Market)",
            chartLine1: "Our AOV Trend",
            chartLine2: "Market Average",
            currency: "€",
            marketDemand: "Checkout Intent",
            marketSearch: "Product Views",
            forecastRooms: "Orders Processed",
            forecastPace: "Sales Velocity",
            parityUndercut: "Reseller Discount Risk",
            strDirect: "Direct Sales %",
            pulseSentiment: "Buyer Sentiment Score",
        }
    }
};

export const siteConfig = {
    ...nichesInfo[ACTIVE_NICHE],
    links: { twitter: "https://twitter.com", github: "https://github.com" }
};

export type SiteConfig = typeof siteConfig;
