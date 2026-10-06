import type { Product } from './data/products';
export function getDiscountedPrice(lowestPrice: number, discountPercent: number): number {
    return Math.round(lowestPrice * (1 - discountPercent / 100));
}

export function getLowestPrice(product: Product): number {
    return Math.min(...product.listings.map((listing) => listing.price));
}

export function getStoreCount(product: Product): number {
    return product.listings.length;
}
export function getUniqueBrands(products: Product[]): string[] {
    const unique = new Set(products.map((product) => product.brand));
    return Array.from(unique);
}