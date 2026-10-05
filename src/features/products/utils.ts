import type { Product } from './data/products';

export function getLowestPrice(product: Product): number {
    return Math.min(...product.listings.map((listing) => listing.price));
}

export function getStoreCount(product: Product): number {
    return product.listings.length;
}