export type Category = {
    id: string;
    name: string;
    subtitle: string;
    image: any;
};

export const categories: Category[] = [
    {
        id: 'makeup',
        name: 'Makeup',
        subtitle: 'Face & beauty',
        image: require('../../../../assets/categories/makeup.jpg'),
    },

    {
        id: 'skincare',
        name: 'Skincare',
        subtitle: 'Care & glow',
        image: require('../../../../assets/categories/skincare.png'),
    },

    {
        id: 'haircare',
        name: 'Haircare',
        subtitle: 'Hair essentials',
        image: require('../../../../assets/categories/haircare.jpg'),
    },

    {
        id: 'perfumes',
        name: 'Perfumes',
        subtitle: 'Find your scent',
        image: require('../../../../assets/categories/perfumes.jpg'),
    },

    {
        id: 'body-care',
        name: 'Body Care',
        subtitle: 'Daily care',
        image: require('../../../../assets/categories/body care.jpg'),
    },

    {
        id: 'nails',
        name: 'Nails',
        subtitle: 'Nail essentials',
        image: require('../../../../assets/categories/nails.jpg'),
    },
];