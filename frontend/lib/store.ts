import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, ModifierOption } from './types';

interface CartState {
    items: CartItem[];
    addItem: (item: MenuItem, quantity: number, modifiers?: ModifierOption[]) => void;
    removeItem: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item, quantity, modifiers = []) => {
                const cartId = `${item.id}-${modifiers.map((m) => m.id).sort().join('-')}`;
                const existingItem = get().items.find((i) => i.cartId === cartId);

                if (existingItem) {
                    set((state) => ({
                        items: state.items.map((i) =>
                            i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i
                        ),
                    }));
                } else {
                    const totalPrice = (item.price + modifiers.reduce((acc, m) => acc + m.price, 0));
                    set((state) => ({
                        items: [
                            ...state.items,
                            {
                                ...item,
                                cartId,
                                quantity,
                                selectedModifiers: modifiers,
                                totalPrice,
                            },
                        ],
                    }));
                }
            },
            removeItem: (cartId) =>
                set((state) => ({ items: state.items.filter((i) => i.cartId !== cartId) })),
            updateQuantity: (cartId, quantity) =>
                set((state) => ({
                    items: state.items.map((i) => (i.cartId === cartId ? { ...i, quantity } : i)),
                })),
            clearCart: () => set({ items: [] }),
            total: () =>
                get().items.reduce(
                    (acc, item) => acc + (item.price + item.selectedModifiers.reduce((s, m) => s + m.price, 0)) * item.quantity,
                    0
                ),
        }),
        {
            name: 'cafeos-cart',
        }
    )
);
