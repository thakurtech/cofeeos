import { MenuCategory, CartItem } from './types';

const API_URL = 'http://localhost:3001';

export async function fetchMenu(shopSlug: string = 'cafe-noir'): Promise<MenuCategory[]> {
    const res = await fetch(`${API_URL}/menu?shop=${shopSlug}`);
    if (!res.ok) throw new Error('Failed to fetch menu');
    return res.json();
}

export async function createOrder(shopId: string, items: CartItem[]) {
    const orderItems = items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        modifiers: item.selectedModifiers.map((m) => m.id),
    }));

    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            shopId,
            items: orderItems,
            source: 'POS',
        }),
    });

    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
}

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json();
}
