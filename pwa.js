const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.endsWith('.local')
);

const isSecureContext = window.location.protocol === 'https:' || isLocalhost;

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !isSecureContext) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('service-worker.js');
    console.info('Service worker registered:', registration.scope);
  } catch (error) {
    console.error('Service worker registration failed:', error);
  }
}

window.addEventListener('load', registerServiceWorker);
