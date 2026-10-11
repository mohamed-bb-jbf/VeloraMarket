import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { db } from '../services/firebase';
import { useAuth } from './auth-context';

type FavoritesContextType = {
    favoriteIds: string[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    useEffect(() => {
        if (!user) {
            setFavoriteIds([]);
            return;
        }

        const sync = async () => {
            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                const remote: string[] = snap.exists() ? snap.data().favoriteIds ?? [] : [];
                const merged = Array.from(new Set([...remote, ...favoriteIds]));

                setFavoriteIds(merged);
                await setDoc(ref, { favoriteIds: merged }, { merge: true });
            } catch {
                // keep local favorites if the sync fails
            }
        };

        sync();
    }, [user?.uid]);

    const isFavorite = (id: string) => favoriteIds.includes(id);

    const toggleFavorite = (id: string) => {
        const next = favoriteIds.includes(id)
            ? favoriteIds.filter((favId) => favId !== id)
            : [...favoriteIds, id];

        setFavoriteIds(next);

        if (user) {
            setDoc(doc(db, 'users', user.uid), { favoriteIds: next }, { merge: true }).catch(() => {});
        }
    };

    return (
        <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }

    return context;
}
