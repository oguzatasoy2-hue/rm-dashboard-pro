export type NicheType = "hotel" | "saas" | "ecommerce";

// ==========================================
// 🎯 ACTIVE THEME SELECTOR
// Change this value to switch the dashboard's entire industry!
// ==========================================
export const ACTIVE_NICHE: NicheType = "hotel";

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
        }
    }
};

export const siteConfig = {
    ...nichesInfo[ACTIVE_NICHE],
    links: { twitter: "https://twitter.com", github: "https://github.com" }
};

export type SiteConfig = typeof siteConfig;
