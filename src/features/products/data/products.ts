export type StoreListing = {
    storeId: string;
    price: number;
};

export type Product = {
    id: string;
    name: string;
    brand: string;
    category: string;
    image: any;
    rating: number;
    listings: StoreListing[];
};

export const products: Product[] = [
    {
        id: 'product-1',
        name: 'Velvet Matte Lipstick',
        brand: 'L’Oréal',
        category: 'Makeup',
        image: require('../../../../assets/categories/makeup.jpg'),
        rating: 4.8,
        listings: [
            { storeId: 'store-1', price: 2800 },
            { storeId: 'store-2', price: 3000 },
        ],
    },

    {
        id: 'product-2',
        name: 'Hydrating Face Cream',
        brand: 'CeraVe',
        category: 'Skincare',
        image: require('../../../../assets/categories/skincare.png'),
        rating: 4.9,
        listings: [
            { storeId: 'store-1', price: 4200 },
            { storeId: 'store-2', price: 4500 },
            { storeId: 'store-3', price: 4000 },
        ],
    },

    {
        id: 'product-3',
        name: 'Repair Hair Mask',
        brand: 'L’Oréal',
        category: 'Haircare',
        image: require('../../../../assets/categories/haircare.jpg'),
        rating: 4.7,
        listings: [
            { storeId: 'store-2', price: 3500 },
            { storeId: 'store-4', price: 3700 },
        ],
    },

    {
        id: 'product-4',
        name: 'Eau de Parfum',
        brand: 'Yves Saint Laurent',
        category: 'Perfumes',
        image: require('../../../../assets/categories/perfumes.jpg'),
        rating: 4.9,
        listings: [
            { storeId: 'store-1', price: 12500 },
            { storeId: 'store-3', price: 13000 },
        ],
    },

    {
        id: 'product-5',
        name: 'Nourishing Body Lotion',
        brand: 'Nivea',
        category: 'Body Care',
        image: require('../../../../assets/categories/body-care.jpg'),
        rating: 4.6,
        listings: [
            { storeId: 'store-2', price: 1900 },
            { storeId: 'store-4', price: 2100 },
        ],
    },

    {
        id: 'product-6',
        name: 'Gel Nail Polish',
        brand: 'OPI',
        category: 'Nails',
        image: require('../../../../assets/categories/nails.jpg'),
        rating: 4.5,
        listings: [
            { storeId: 'store-1', price: 2300 },
            { storeId: 'store-3', price: 2500 },
        ],
    },
];