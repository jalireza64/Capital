//const DEBUG = false;

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
//const { assets } = global.serviceWorkerOption;

//const CACHE_NAME = new Date().toISOString();

//let assetsToCache = [...assets, './'];

//assetsToCache = assetsToCache.map(path => {
//    return new URL(path, global.location).toString();
//});

//assetsToCache = [];

// When the service worker is first added to a computer.
//self.addEventListener('install', event => {
//   Perform install steps.
//  if (DEBUG) {
//    console.log('[SW] Install event');
//  }

//  // Add core website files to cache during serviceworker installation.
//  event.waitUntil(
//    global.caches
//      .open(CACHE_NAME)
//      .then(cache => {
//        return cache.addAll(assetsToCache);
//      })
//      .then(() => {
//        if (DEBUG) {
//          console.log('Cached assets: main', assetsToCache);
//        }
//      })
//      .catch(error => {
//        console.error(error);
//        throw error;
//      })
//  );
//});

// After the install event.
//self.addEventListener('activate', event => {
//  if (DEBUG) {
//    console.log('[SW] Activate event');
//  }

//   Clean the caches
//  event.waitUntil(
//    global.caches.keys().then(cacheNames => {
//      return Promise.all(
//        cacheNames.map(cacheName => {
//           Delete the caches that are not the current one.
//          if (cacheName.indexOf(CACHE_NAME) === 0) {
//            return null;
//          }

//          return global.caches.delete(cacheName);
//        })
//      )
//    })
//  );
//})

//self.addEventListener('message', event => {
//  switch (event.data.action) {
//    case 'skipWaiting':
//      if (self.skipWaiting) {
//        self.skipWaiting();
//        self.clients.claim();
//      }
//      break
//    default:
//      break
//  }
//})

var CACHE = 'cache-and-update';

self.addEventListener('install', function () {
    return self.skipWaiting();
});

self.addEventListener('activate', function () {
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    //Ignore not GET request.
    if (e.request.method !== 'GET') {
        return;
    }

    const isHashed = e.request.url.includes("---") && (e.request.url.includes("dist/main") || e.request.url.includes("dist/chunk") || e.request.url.includes("dist/resourcemanager"));

    e.waitUntil(() => {
        fromCache(e.request).then(result => {
            e.respondWith(result);
            if (isHashed) return;
            e.waitUntil(update(e.request));
        }).catch(() => {
            e.respondWith(update(e.request));
        });
    });
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (matching) {
                return matching;
            } else {
                Promise.reject('no-match');
            }
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            cache.put(request, response);
            return response;
        });
    });
}

self.addEventListener('push', function (e) {
    e.waitUntil((async () => {
        const data = e.data.json();
        console.log(data);
        let employee = {};
        if (data.RequesterId) {
            const response = await fetch(`/api/Employee/GetEmployee?EmployeeId=${data.RequesterId}`,
                {
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "Get",
                }
            );
            employee = await response.json();
        }
        console.log(employee);
        let options = {
            body: data.Body,
            icon: "data:image/png;base64," + employee.Photo || 'content/icon192x192.jpg',
            vibrate: [50, 30, 50],
            //actions: [
            //    {
            //        action: "yay", title: "قبول"
            //    },
            //    {
            //        action: "nay", title: "رد"
            //    }
            //]
        };
        console.log("before notification");
        await self.registration.showNotification(`${data.Title} • ${employee.FullName}`, options);
        console.log("after notification");
    })());
});

//self.addEventListener("notificationclick", (event) => {
//    let promise = new Promise((resolve) => {
//        event.notification.close();
//        console.log(event.action);
//        resolve();
//    });
//    event.waitUntil(promise);
//});

// Pass Through
//self.addEventListener('fetch', e => {
//    e.respondWith(fetch(e.request));
//});
