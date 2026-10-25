import { collection, getDocs } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import type { Product, StoreListing } from '../features/products/data/products';
import { productImages } from '../features/products/images';
import type { Store } from '../features/stores/data/stores';
import { db } from '../services/firebase';

type CatalogContextType = {
    products: Product[];
    stores: Store[];
    loading: boolean;
    error: boolean;
    reload: () => Promise<void>;
};

type ProductDoc = Omit<Product, 'image' | 'listings'> & {
    imageKey?: string;
    imageUrl?: string;
};

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const load = async () => {
        try {
            setError(false);

            const [productsSnap, storesSnap, listingsSnap] = await Promise.all([
                getDocs(collection(db, 'products')),
                getDocs(collection(db, 'stores')),
                getDocs(collection(db, 'listings')),
            ]);

            const listingsByProduct = new Map<string, StoreListing[]>();

            listingsSnap.docs.forEach((item) => {
                const data = item.data() as { productId: string; storeId: string; price: number };
                const current = listingsByProduct.get(data.productId) ?? [];

                current.push({ storeId: data.storeId, price: data.price });
                listingsByProduct.set(data.productId, current);
            });

            setProducts(
                productsSnap.docs
                    .map((item) => {
                        const data = item.data() as ProductDoc;

                        return {
                            ...data,
                            id: item.id,
                            image: data.imageUrl
                                ? { uri: data.imageUrl }
                                : productImages[data.imageKey ?? ''] ?? productImages.makeup,
                            listings: listingsByProduct.get(item.id) ?? [],
                        };
                    })
                    .filter((product) => product.listings.length > 0)
            );

            setStores(
                storesSnap.docs.map((item) => ({
                    ...(item.data() as Omit<Store, 'id'>),
                    id: item.id,
                }))
            );
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <CatalogContext.Provider value={{ products, stores, loading, error, reload: load }}>
            {children}
        </CatalogContext.Provider>
    );
}

export function useCatalog() {
    const context = useContext(CatalogContext);

    if (!context) {
        throw new Error('useCatalog must be used within a CatalogProvider');
    }

    return context;
}
