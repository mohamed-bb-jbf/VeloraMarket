import { createContext, ReactNode, useContext, useState } from 'react';

type FavoritesContextType = {
    favoriteIds: string[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const isFavorite = (id: string) => favoriteIds.includes(id);

    const toggleFavorite = (id: string) => {
        setFavoriteIds((current) =>
            current.includes(id)
                ? current.filter((favId) => favId !== id)
                : [...current, id]
        );
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