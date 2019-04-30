// Listen for the install event then open a new cache
var cacheName = 'weatherPWA';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/styles/ud811.css',
  '/scripts/app.js',
  '/images/clear.png',
  '/images/cloudy_s_sunny.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
      caches.open(cacheName).then(function(cache){
        console.log('ServiceWorker [Adding to cache]')
        return cache.addAll(filesToCache);
      })
  );
});

// Active event to remove old resources from the cache
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key !== cacheName && key !== dataCacheName){
          console.log('ServiceWorker [Removing from cache]', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Serve requested resources or pull from the cache
self.addEventListener('fetch', function(event){
  console.log('[ServiceWorker Fetch]', event.request.url);
  event.respondWith(
    // compare the cache with the requested rerouce
    caches.match(event.request).then(function(response){
      return response || fetch(event.request);
    })
  );
});