import App from './App.svelte'

const app = new App({
  target: document.body,
})

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.')
  navigator.serviceWorker.register('/service-worker.js').then(
    () => {
      console.log('CLIENT: service worker registration complete.')
    },
    () => {
      console.log('CLIENT: service worker registration failure.')
    }
  )
} else {
  console.log('CLIENT: service worker is not supported.')
}

export default app
