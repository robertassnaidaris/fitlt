const CACHE = 'fitlt-pilna-v4';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || accept.includes('text/html');

  if (isHTML) {
    // Network-first: HTML (programos kodas) visada imamas iš tinklo,
    // kad kodo atnaujinimai iš karto pasiektų vartotoją.
    // Cache naudojamas tik atsargai, kai nėra interneto.
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(c => c || caches.match('./index.html')))
    );
  } else {
    // Cache-first: statiniai ištekliai (ikonos, manifestas ir pan.)
    e.respondWith(
      caches.match(req).then(cached =>
        cached || fetch(req)
          .then(res => {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
            return res;
          })
          .catch(() => cached)
      )
    );
  }
});

// Push notifications
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(self.registration.showNotification(data.title || 'FitLT', {
    body: data.body || 'Laikas treniruotis! 💪',
    icon: './icon-192.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'fitlt-reminder',
    data: { url: data.url || './' },
    actions: [
      { action: 'open', title: '🏋️ Atidaryti' },
      { action: 'dismiss', title: 'Vėliau' }
    ]
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action !== 'dismiss') {
    e.waitUntil(clients.openWindow(e.notification.data?.url || './'));
  }
});

// Schedule daily workout reminder
self.addEventListener('periodicsync', e => {
  if (e.tag === 'workout-reminder') {
    e.waitUntil(self.registration.showNotification('FitLT', {
      body: 'Ar šiandien jau treniravotės? 🔥',
      icon: './icon-192.png',
      tag: 'daily-reminder'
    }));
  }
});
