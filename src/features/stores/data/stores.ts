export type Store = {
    id: string;
    name: string;
    rating: number;
    location: string;
    distanceKm: number;
    openNow: boolean;
};

export const stores: Store[] = [
    {
        id: 'store-1',
        name: 'Beauty Palace',
        rating: 4.7,
        location: 'Médéa Centre',
        distanceKm: 1.2,
        openNow: true,
    },
    {
        id: 'store-2',
        name: 'Glow Cosmetics',
        rating: 4.5,
        location: 'Médéa',
        distanceKm: 2.8,
        openNow: true,
    },
    {
        id: 'store-3',
        name: 'La Belle Boutique',
        rating: 4.8,
        location: 'Médéa',
        distanceKm: 5.1,
        openNow: false,
    },
    {
        id: 'store-4',
        name: 'Pharmacie de Beauté',
        rating: 4.6,
        location: 'Ouzera',
        distanceKm: 3.4,
        openNow: true,
    },
];