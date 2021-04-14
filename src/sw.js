const CACHE_NAME = 'kekEnd_Cache';
const cacheUrls = [
    '/',
    './app.js',
    './index.html',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            }),
    );
});


self.addEventListener('fetch', (event) => {
    const request = event.request;

    if (request.method !== 'GET') {
        return;
    }

    const resource = caches
        .match(request)
        .then((response) => {
            if (!navigator.onLine && response) {
                return response;
            }
            return fetch(request)
                .then((res) => {
                    const responseCache = res.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => {
                            console.log(request, responseCache);
                            return cache.put(request, responseCache);
                        });
                    return res;
                })
                .catch(() => {
                    return null;
                });
        });

    event.respondWith(resource);
});
