/**
 * Yacente - Service Worker
 * Gestiona el cacheo de recursos para funcionamiento offline y notificaciones push.
 */



// Escucha evento click en notificaciones de segundo plano para redirigir
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = (event.notification.data && event.notification.data.click_action) || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Si hay alguna pestaña ya abierta en la misma web, enfocarla
            for (let client of windowClients) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Si no, abrir una nueva pestaña
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

const CACHE_NAME = "yacente-v288";
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./index.html?pwa=1",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icons/icon-512-rounded.png",
    "./icons/icon-192-rounded.png",
    "./icons/escudo.png",
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js",
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js",

    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
];

// Instalar: cachear recursos estáticos
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[SW] Cacheando recursos estáticos...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // Activar inmediatamente sin esperar a que se cierren las pestañas
    self.skipWaiting();
});

// Activar: limpiar cachés antiguos
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log("[SW] Eliminando caché antiguo:", name);
                        return caches.delete(name);
                    })
            );
        })
    );
    // Tomar control de todas las páginas abiertas
    self.clients.claim();
});

// Fetch: estrategia Network First con fallback a caché
self.addEventListener("fetch", (event) => {
    // Solo manejar peticiones GET con esquemas HTTP/HTTPS
    if (event.request.method !== "GET" || !event.request.url.startsWith("http")) return;

    // Para peticiones de Google Fonts u otros CDN, usar Cache First
    if (event.request.url.includes("fonts.googleapis.com") || 
        event.request.url.includes("fonts.gstatic.com")) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                if (cached) return cached;
                return fetch(event.request).then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                    return response;
                });
            })
        );
        return;
    }

    // Para recursos locales: Network First
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Si la respuesta es válida, guardarla en caché
                if (response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Si no hay red, intentar servir desde caché
                return caches.match(event.request).then((cached) => {
                    if (cached) return cached;
                    // Fallback para navegación: servir index.html
                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html").then((htmlCached) => {
                            return htmlCached || new Response("Sin conexión", {
                                status: 503,
                                headers: { "Content-Type": "text/html; charset=utf-8" }
                            });
                        });
                    }
                    return new Response("Sin conexión", { status: 503 });
                });
            })
    );
});
