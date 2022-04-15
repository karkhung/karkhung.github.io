//version
var appVersion = 'cache.v1';

//file to cache

var files =[
  './',
  'assets/css/style.css',
  'assets/fontawesome/css/fontawesome.min.css',
  'assets/fontawesome/css/all.css',
  'assets/fonts/Qomolangma-Title.ttf',
  'assets/fonts/Qomolangma-UchenSuring.ttf',
  //'https://cdn.plyr.io/3.6.2/plyr.css',
  'assets/icons/background.jpg'
]

// install

self.addEventListener('install',event =>{
  event.waitUntil(
    caches.open(appVersion)
    .then(cache=>{
      return cache.addAll(files)
      .catch(err=>{
        console.error('Error adding files to cache',err);
      })
    })
    )
  console.info('service worker installed');
  self.skipWaiting();
})


//activate
self.addEventListener('activate',event=>{
  event.waitUntil(
      caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== appVersion){
                console.info('Deleting old cache',cache)
                return caches.delete(cache);
            }
          })
          )
      })
    )
  return self.clients.claim();
})

//fetch
self.addEventListener('fetch',event =>{
    console.info('sw fetch',event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(res =>{
            return res || fetch(event.request);

        })
      )
})