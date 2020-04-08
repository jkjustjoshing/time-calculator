const version = 'v1'

self.addEventListener('install', (event) => {
  console.log('WORKER: install event in progress.')
  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'fundamentals')
      .then(function (cache) {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources we've indicated to the cache,
           after making HTTP requests for each of them.
        */
        return cache.addAll([
          '/',
          '/global.css',
          '/build/bundle.css',
          '/build/bundle.js',
        ])
      })
      .then(function () {
        console.log('WORKER: install completed')
      })
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    console.log(
      'WORKER: fetch event ignored.',
      event.request.method,
      event.request.url
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      /* Even if the response is in our cache, we go to the network as well.
         This pattern is known for producing "eventually fresh" responses,
         where we return cached responses immediately, and meanwhile pull
         a network response and store that in the cache.
       */

      const networked = fetch(event.request)
        .then(fetchedFromNetwork)
        .catch(unableToResolve)

      console.log(
        'WORKER: fetch event',
        cached ? '(cached)' : '(network)',
        event.request.url
      )
      return cached || networked

      function fetchedFromNetwork(response) {
        const cacheCopy = response.clone()
        console.log('WORKER: fetch response from network.', event.request.url)
        caches
          .open(version + 'pages')
          .then((cache) => cache.put(event.request, cacheCopy))
          .then(() =>
            console.log(
              'WORKER: fetch response stored in cache.',
              event.request.url
            )
          )
        return response
      }

      function unableToResolve() {
        console.log('WORKER: fetch request failed in both cache and network.')
        return new Response('<h1>Service unavailable</h1>', {
          status: 503,
          statusText: 'Service unavailable',
          headers: new Headers({
            'Content-Type': 'text/html',
          }),
        })
      }
    })
  )
})

self.addEventListener('activate', (event) => {
  // Clear out old caches
  console.log('WORKER: activate event in progress.')

  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.startsWith(version))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => console.log('WORKER: activate completed.'))
  )
})
