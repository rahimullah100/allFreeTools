// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New update available
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Check for updates every hour
setInterval(() => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration) {
                registration.update().catch(error => {
                    console.log('ServiceWorker update check failed: ', error);
                });
            }
        });
    }
}, 60 * 60 * 1000); // 1 hour

// Show update notification
function showUpdateNotification() {
    if (window.confirm('A new version of allFreeTools is available. Would you like to update now?')) {
        // Reload the page to activate the new service worker
        window.location.reload();
    }
}

// Listen for the beforeinstallprompt event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show the install button
    const installButton = document.getElementById('install-button');
    if (installButton) {
        installButton.style.display = 'block';
        
        installButton.addEventListener('click', () => {
            // Hide the install button
            installButton.style.display = 'none';
            
            // Show the install prompt
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        });
    }
});

// Track successful installation
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    // You can track installations in your analytics here
    if (window.gtag) {
        window.gtag('event', 'app_installed');
    }
});

// Check if the app is running in standalone mode
function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) || 
           (window.navigator.standalone) || 
           document.referrer.includes('android-app://');
}

// Add a class to the body if running in standalone mode
if (isRunningStandalone()) {
    document.body.classList.add('pwa-standalone');
}

// Listen for changes in display mode
window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('pwa-standalone');
    } else {
        document.body.classList.remove('pwa-standalone');
    }
});
