'use strict'; 

const cacheName = "baodetuan";

var urlsToCache = [
  'AddShop.js',
  'AddType.js',
  'ShopDetail.js',
  'ShopList.js'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache){
        console.log('opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
      .then(function(response){
        console.log(event.request);
        if(response) {
          return response;
        }  
        return fetch(event.request);
      })
  );
});






