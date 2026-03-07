import { NextResponse } from 'next/server';

export async function GET() {
    // Simulated Semantic Analysis Data
    const sentimentData = {
        score: 72,
        trend: "+5%",
        pillars: [
            { category: "Chambres & Confort", our_score: 85, comp_avg: 78, delta: 7, priority: "low" },
            { category: "Technologie In-Room", our_score: 62, comp_avg: 82, delta: -20, priority: "high" },
            { category: "Service & Accueil", our_score: 91, comp_avg: 84, delta: 7, priority: "low" },
            { category: "Petit Déjeuner", our_score: 75, comp_avg: 72, delta: 3, priority: "medium" },
            { category: "Rapport Qualité/Prix", our_score: 68, comp_avg: 70, delta: -2, priority: "medium" },
        ],
        competitor_insights: [
            {
                hotel: "Pullman Bordeaux Lac",
                strength: "Équipements Chromecast & Wi-Fi 6 ultra-rapide",
                impact: -15, // potential loss if not matched
                mention_rate: "45% des avis récents"
            },
            {
                hotel: "Novotel Bordeaux Lac",
                strength: "Nouveau concept de literie LiveN",
                impact: -8,
                mention_rate: "30% des avis récents"
            }
        ],
        investment_roadmap: [
            {
                item: "Mise à niveau Smart TV (Cast)",
                cost_estimate: "12,000 €",
                revenue_potential: "+4.5% ADR",
                urgency: "CRITICAL",
                logic: "45% des clients au Pullman mentionnent le Cast comme critère de choix."
            },
            {
                item: "Machine à café Premium (Nespresso)",
                cost_estimate: "2,500 €",
                revenue_potential: "+2% ADR",
                urgency: "MEDIUM",
                logic: "Améliore le score 'Petit Déjeuner' qui est actuellement proche de la moyenne marché."
            }
        ],
        cash_cow: {
            item: "Vue Panoramique Lac",
            strength: "94% de satisfaction mentionnée",
            advice: "Augmentez le supplément 'Vue Lac' de 15€ à 25€ le week-end."
        }
    };

    return NextResponse.json(sentimentData);
}
