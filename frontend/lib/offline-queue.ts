// Offline Order Queue using IndexedDB
// This module handles storing orders when offline and syncing when back online

const DB_NAME = 'cafeos-offline';
const DB_VERSION = 1;
const ORDERS_STORE = 'orders';

interface OfflineOrder {
    id?: number;
    data: any;
    timestamp: number;
    retryCount: number;
}

class OfflineQueue {
    private db: IDBDatabase | null = null;

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(ORDERS_STORE)) {
                    db.createObjectStore(ORDERS_STORE, { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }

    async addOrder(orderData: any): Promise<number> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(ORDERS_STORE, 'readwrite');
            const store = tx.objectStore(ORDERS_STORE);

            const order: OfflineOrder = {
                data: orderData,
                timestamp: Date.now(),
                retryCount: 0,
            };

            const request = store.add(order);
            request.onsuccess = () => resolve(request.result as number);
            request.onerror = () => reject(request.error);
        });
    }

    async getOrders(): Promise<OfflineOrder[]> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(ORDERS_STORE, 'readonly');
            const store = tx.objectStore(ORDERS_STORE);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async removeOrder(id: number): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(ORDERS_STORE, 'readwrite');
            const store = tx.objectStore(ORDERS_STORE);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getCount(): Promise<number> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(ORDERS_STORE, 'readonly');
            const store = tx.objectStore(ORDERS_STORE);
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async syncOrders(submitFn: (data: any) => Promise<any>): Promise<{ synced: number; failed: number }> {
        const orders = await this.getOrders();
        let synced = 0;
        let failed = 0;

        for (const order of orders) {
            try {
                await submitFn(order.data);
                await this.removeOrder(order.id!);
                synced++;
            } catch (error) {
                console.error('Failed to sync order:', error);
                failed++;
            }
        }

        return { synced, failed };
    }
}

export const offlineQueue = new OfflineQueue();

// Register service worker and request background sync
export async function registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', registration.scope);

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'ORDER_SYNCED') {
                    console.log('Order synced:', event.data.orderId);
                    // You can dispatch a custom event here for UI updates
                    window.dispatchEvent(new CustomEvent('orderSynced', {
                        detail: { orderId: event.data.orderId }
                    }));
                }
            });

        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

// Request background sync
export async function requestSync(): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in (navigator.serviceWorker as any)) {
        const registration = await navigator.serviceWorker.ready;
        await (registration as any).sync.register('sync-orders');
    }
}

// Check if online
export function isOnline(): boolean {
    return navigator.onLine;
}

// Listen for online/offline events
export function addNetworkListeners(
    onOnline: () => void,
    onOffline: () => void
): () => void {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
    };
}
