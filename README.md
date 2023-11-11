# Progressive Web Application (PWA)

A simple demo that shows how to setup a web application that supports offline mode. The features are basically to be able to load the application while offline and make it possible to store some type of data offline (here using localStorage). Then trigger some type of sync when going back online (demonstrated with a simple console.log).

## Tested browsers

It works fine in Chrome and Edge, just make sure that **cache is not disabled** as the whole built application is cached through the service worker. For Firefox users you will need to tweak some settings as the browser per default blocks service workers due to the restrictive anti-cookie/third-party policy or something similar. Did not spend time to make it work using Firefox, but I concluded that it just didn't for now.

## Service Worker
Since this uses SvelteKit we just added a service-worker.js file with the following lines of code. SvelteKit handles the actual loading of this file and also exposes the $service-worker variable.

    import { build, files, prerendered, version } from '$service-worker'  
    import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'  
      
    const precache_list = [  
      ...build,  
      ...files,  
      ...prerendered  
    ].map(s => ({  
      url: s,  
      revision: version  
    }))  
      
    precacheAndRoute(precache_list)

For more details on this the example can be found on [Antonio Sarcevic blog](https://www.sarcevic.dev/offline-first-installable-pwa-sveltekit-workbox-precaching#service-worker).

### Workbox
It uses Workbox precaching as a dependency that handles the actual caching logic. Files that should be cached are written above in the service worker. We indicate precaching by putting `export const prerender = true` inside our +page.js in our route folder. The +page.js file is a SvelteKit route standard so you can put other things in there as well. The service worker will cache the built files from the build directory.

## Vite
To test and run the application you run `npm run build` because for it to work offline all required files needs to be cached. Then you run the app using `npm run preview`, because that will serve up the built application instead of the regular development mode.

Service Workers will not attach itself if not served from https so vite is setup with https using mkcert as a npm package. 
## Some personal notes for myself (and others)

 - ServiceWorker serves cache, so caching is a huge thing. This could be
   the browser storage of assets, or if the latest service worker is not
   attached to the website. The browser dev tools will show when the service worker
   was last installed.
   
 - The very first visit obviously needs to be an online request to reach
   the url that installs and attaches the service-worker

 - When testing the actual offline mode and offline functionality the   
   application needs to be built, it cannot run in dev mode.
