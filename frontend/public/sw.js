const CACHE_NAME = 'cafeos-v1';
const STATIC_ASSETS = [
    '/',
    '/pos',
    '/kitchen',
    '/dashboard',
    '/login',
    '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // API requests - network only with offline queue for orders
    if (url.pathname.startsWith('/api') || url.origin !== location.origin) {
        event.respondWith(
            fetch(request).catch(() => {
                // Return offline response for API
                return new Response(
                    JSON.stringify({ error: 'Offline', offline: true }),
                    {
                        status: 503,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            })
        );
        return;
    }

    // Static assets - cache first
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Update cache in background
                fetch(request).then((response) => {
                    if (response.ok) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, response);
                        });
                    }
                });
                return cachedResponse;
            }

            return fetch(request).then((response) => {
                // Don't cache non-successful responses
                if (!response.ok) {
                    return response;
                }

                // Cache successful responses
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, responseClone);
                });

                return response;
            }).catch(() => {
                // Return offline page for navigation requests
                if (request.mode === 'navigate') {
                    return caches.match('/');
                }
                return new Response('Offline', { status: 503 });
            });
        })
    );
});

// Background sync for offline orders
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOfflineOrders());
    }
});

async function syncOfflineOrders() {
    try {
        // Get orders from IndexedDB
        const db = await openDB();
        const orders = await getOfflineOrders(db);

        for (const order of orders) {
            try {
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order.data),
                });

                if (response.ok) {
                    await removeOrder(db, order.id);
                    // Notify the client
                    self.clients.matchAll().then((clients) => {
                        clients.forEach((client) => {
                            client.postMessage({
                                type: 'ORDER_SYNCED',
                                orderId: order.id,
                            });
                        });
                    });
                }
            } catch (e) {
                console.error('[SW] Failed to sync order:', e);
            }
        }
    } catch (e) {
        console.error('[SW] Sync failed:', e);
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('cafeos-offline', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('orders')) {
                db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

function getOfflineOrders(db) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('orders', 'readonly');
        const store = tx.objectStore('orders');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function removeOrder(db, id) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('orders', 'readwrite');
        const store = tx.objectStore('orders');
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Push notifications
self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};

    const options = {
        body: data.body || 'New notification',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge.png',
        vibrate: [200, 100, 200],
        tag: data.tag || 'cafeos-notification',
        data: data.url ? { url: data.url } : undefined,
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'CaféOS', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const url = event.notification.data?.url || '/';

    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clients) => {
            // Focus existing window or open new one
            for (const client of clients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            return self.clients.openWindow(url);
        })
    );
});
