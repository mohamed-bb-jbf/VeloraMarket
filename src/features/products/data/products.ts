export type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    image: any;
    rating: number;
    storeCount: number;
};

export const products: Product[] = [
    {
        id: 'product-1',
        name: 'Velvet Matte Lipstick',
        brand: 'L’Oréal',
        price: 2800,
        category: 'Makeup',
        image: require('../../../../assets/categories/makeup.jpg'),
        rating: 4.8,
        storeCount: 12,
    },

    {
        id: 'product-2',
        name: 'Hydrating Face Cream',
        brand: 'CeraVe',
        price: 4200,
        category: 'Skincare',
        image: require('../../../../assets/categories/skincare.png'),
        rating: 4.9,
        storeCount: 8,
    },

    {
        id: 'product-3',
        name: 'Repair Hair Mask',
        brand: 'L’Oréal',
        price: 3500,
        category: 'Haircare',
        image: require('../../../../assets/categories/haircare.jpg'),
        rating: 4.7,
        storeCount: 10,
    },

    {
        id: 'product-4',
        name: 'Eau de Parfum',
        brand: 'Yves Saint Laurent',
        price: 12500,
        category: 'Perfumes',
        image: require('../../../../assets/categories/perfumes.jpg'),
        rating: 4.9,
        storeCount: 6,
    },

    {
        id: 'product-5',
        name: 'Nourishing Body Lotion',
        brand: 'Nivea',
        price: 1900,
        category: 'Body Care',
        image: require('../../../../assets/categories/body-care.jpg'),
        rating: 4.6,
        storeCount: 9,
    },

    {
        id: 'product-6',
        name: 'Gel Nail Polish',
        brand: 'OPI',
        price: 2300,
        category: 'Nails',
        image: require('../../../../assets/categories/nails.jpg'),
        rating: 4.5,
        storeCount: 7,
    },
];