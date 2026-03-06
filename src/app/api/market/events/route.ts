import { NextResponse } from 'next/server';

export async function GET() {
    // Localized events for Bordeaux Lac (Exhibition Center, Stadium, Lake)
    const events = [
        {
            id: "ev_001",
            title: "Salon de l'Agriculture Nouvelle-Aquitaine",
            location: "Parc des Expositions de Bordeaux Lac",
            startDate: "2026-03-20",
            endDate: "2026-03-28",
            impact: "High",
            category: "Professional",
            attendance: 300000,
            distanceFromHotel: "0.4 km",
            source: "OpenData Bordeaux",
        },
        {
            id: "ev_002",
            title: "Match: Girondins de Bordeaux vs AS Saint-Étienne",
            location: "Matmut Atlantique Stadium",
            startDate: "2026-03-12",
            endDate: "2026-03-12",
            impact: "Medium",
            category: "Sports",
            attendance: 42000,
            distanceFromHotel: "0.8 km",
            source: "LFP / Matmut Atlantique",
        },
        {
            id: "ev_003",
            title: "Congrès des Notaires",
            location: "Palais des Congrès de Bordeaux",
            startDate: "2026-03-15",
            endDate: "2026-03-18",
            impact: "Very High",
            category: "Professional",
            attendance: 5000,
            distanceFromHotel: "0.2 km",
            source: "Palais des Congrès",
        },
        {
            id: "ev_004",
            title: "Triathlon de Bordeaux-Lac",
            location: "Lac de Bordeaux",
            startDate: "2026-03-22",
            endDate: "2026-03-22",
            impact: "Low",
            category: "Public",
            attendance: 1500,
            distanceFromHotel: "0.1 km",
            source: "Mairie de Bordeaux",
        },
        {
            id: "ev_005",
            title: "Jumping International de Bordeaux",
            location: "Parc des Expositions",
            startDate: "2026-02-05", // Historic data for context or upcoming if date adjusted
            endDate: "2026-02-08",
            impact: "High",
            category: "Sports",
            attendance: 60000,
            distanceFromHotel: "0.5 km",
            source: "OpenData Bordeaux",
        }
    ];

    return NextResponse.json({
        city: "Bordeaux",
        district: "Lac",
        hotel_context: "Hôtel Le Provençal",
        events: events,
        summary: {
            next_30_days: 4,
            peak_impact_date: "2026-03-20",
            total_estimated_attendance: 348500
        }
    });
}
