import { collection, getDocs } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import type { Product } from '../features/products/data/products';
import { productImages } from '../features/products/images';
import type { Store } from '../features/stores/data/stores';
import { db } from '../services/firebase';

type CatalogContextType = {
    products: Product[];
    stores: Store[];
    loading: boolean;
    error: boolean;
};

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const [productsSnap, storesSnap] = await Promise.all([
                    getDocs(collection(db, 'products')),
                    getDocs(collection(db, 'stores')),
                ]);

                setProducts(
                    productsSnap.docs.map((item) => {
                        const data = item.data() as Omit<Product, 'image'> & { imageKey: string };
                        return {
                            ...data,
                            id: item.id,
                            image: productImages[data.imageKey] ?? productImages.makeup,
                        };
                    })
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

        load();
    }, []);

    return (
        <CatalogContext.Provider value={{ products, stores, loading, error }}>
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
