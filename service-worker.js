const CACHE_NAME = "akakatsuki-cache";

self.addEventListener("install", event => {
self.skipWaiting();
});

self.addEventListener("activate", event => {
event.waitUntil(
	caches.keys().then(keys =>
	Promise.all(
		keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
	)
	)
);
clients.claim();
});

self.addEventListener("fetch", event => {
const request = event.request;

// Toujours utiliser network-first pour les fichiers critiques
if (request.headers.get("accept")?.includes("text/html") ||
	request.url.endsWith(".js") ||
	request.url.endsWith(".css")) {

	event.respondWith(
	fetch(request)
		.then(response => response)
		.catch(() => caches.match(request))
	);
	return;
}

// Cache-first uniquement pour les images
if (request.destination === "image") {
	event.respondWith(
	caches.match(request).then(
		cached =>
		cached ||
		fetch(request).then(response => {
			const copy = response.clone();
			caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
			return response;
		})
	)
	);
	return;
}

// Par défaut, network-first
event.respondWith(
	fetch(request).catch(() => caches.match(request))
);
});
