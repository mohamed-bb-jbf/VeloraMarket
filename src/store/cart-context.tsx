import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { db } from '../services/firebase';
import { useAuth } from './auth-context';

type CartItem = {
    productId: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function mergeCarts(remote: CartItem[], local: CartItem[]): CartItem[] {
    const quantities = new Map<string, number>();

    [...remote, ...local].forEach((item) => {
        quantities.set(
            item.productId,
            Math.max(quantities.get(item.productId) ?? 0, item.quantity)
        );
    });

    return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }));
}

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (!user) {
            setItems([]);
            return;
        }

        const sync = async () => {
            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                const remote: CartItem[] = snap.exists() ? snap.data().cartItems ?? [] : [];
                const merged = mergeCarts(remote, items);

                setItems(merged);
                await setDoc(ref, { cartItems: merged }, { merge: true });
            } catch {
                // keep the local cart if the sync fails
            }
        };

        sync();
    }, [user?.uid]);

    const updateItems = (next: CartItem[]) => {
        setItems(next);

        if (user) {
            setDoc(doc(db, 'users', user.uid), { cartItems: next }, { merge: true }).catch(() => {});
        }
    };

    const addToCart = (productId: string) => {
        const existing = items.find((item) => item.productId === productId);

        updateItems(
            existing
                ? items.map((item) =>
                      item.productId === productId
                          ? { ...item, quantity: item.quantity + 1 }
                          : item
                  )
                : [...items, { productId, quantity: 1 }]
        );
    };

    const removeFromCart = (productId: string) => {
        updateItems(items.filter((item) => item.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        updateItems(
            items.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}
