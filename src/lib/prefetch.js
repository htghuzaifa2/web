
// A universal, runtime-based preloader for internal links.
// This script is framework-agnostic and can be dropped into any modern web project.

(function () {
  // Ensure we're in a browser environment.
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // --- Configuration ---
  const PREFETCH_THROTTLE_MS = 500;
  const IDLE_CALLBACK_TIMEOUT = 2000;

  // --- State ---
  const prefetched = new Set();
  let activePrefetches = 0;
  let scanTimeout;

  // --- Global Stats for DevTools ---
  window.__prefetchStats = {
    total: 0,
    queued: 0,
    saved: 0,
  };

  // --- Utility Functions ---

  /**
   * Determines the max number of concurrent prefetches based on network conditions.
   * @returns {number} The limit for parallel prefetches.
   */
  const getPrefetchLimit = () => {
    const connection = navigator.connection;
    if (connection?.saveData) return 0;
    switch (connection?.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 2;
      case '3g':
        return 4;
      case '4g':
      default:
        return 6;
    }
  };

  /**
   * Creates and manages a <link rel="prefetch"> tag.
   * @param {string} url - The URL to prefetch.
   */
  const prefetchUrl = (url) => {
    if (prefetched.has(url) || activePrefetches >= getPrefetchLimit()) {
      return;
    }

    activePrefetches++;
    prefetched.add(url);
    window.__prefetchStats.queued++;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';

    const onFinish = () => {
      link.remove();
      activePrefetches--;
      window.__prefetchStats.total++;
    };

    link.addEventListener('load', onFinish);
    link.addEventListener('error', onFinish);

    document.head.appendChild(link);
  };
  
  /**
   * The callback for the IntersectionObserver.
   * @param {IntersectionObserverEntry[]} entries - The observed entries.
   */
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target instanceof HTMLAnchorElement) {
        const { href } = entry.target;
        // Prefetch on idle to avoid blocking rendering.
        requestIdleCallback(() => {
          prefetchUrl(href);
        }, { timeout: IDLE_CALLBACK_TIMEOUT });
      }
    });
  };

  // --- Observers ---
  const intersectionObserver = new IntersectionObserver(observerCallback, {
    rootMargin: '50%', // Prefetch links 50% of the viewport height away.
  });

  const mutationObserver = new MutationObserver(() => {
    // Throttle scanning to avoid performance issues on rapid DOM changes.
    if (scanTimeout) clearTimeout(scanTimeout);
    scanTimeout = setTimeout(scanForLinks, PREFETCH_THROTTLE_MS);
  });
  
  /**
   * Scans the document for new, valid, internal links and observes them.
   */
  const scanForLinks = () => {
    document.querySelectorAll('a').forEach(link => {
      const url = new URL(link.href, document.location.origin);

      // Rule: Must be an internal route (same origin).
      if (location.origin !== url.origin) return;
      // Rule: Not already prefetched.
      if (prefetched.has(url.href)) return;
      // Rule: Not a hash link, mailto, etc.
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      // Rule: Don't prefetch the current page.
      if (url.pathname === location.pathname) return;

      intersectionObserver.observe(link);
    });
  };

  // --- History Wrapper ---

  /**
   * Wraps history methods to trigger a re-scan on SPA navigation.
   * @param {('pushState'|'replaceState')} method - The history method to wrap.
   */
  const wrapHistoryMethod = (method) => {
    const original = history[method];
    history[method] = function(...args) {
      const result = original.apply(this, args);
      // Trigger a re-scan after the state has been changed.
      requestAnimationFrame(scanForLinks);
      return result;
    };
  };

  // --- Initialization ---

  /**
   * Sets up all the observers and initial scan.
   */
  const initialize = () => {
    // Don't run preloader if user prefers reduced data usage.
    const connection = navigator.connection;
    if (connection?.saveData) {
        window.__prefetchStats.saved = 1;
        return;
    }
    
    // Wrap history methods for SPA navigation detection.
    wrapHistoryMethod('pushState');
    wrapHistoryMethod('replaceState');
    
    // Start observing the whole document for changes.
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    
    // Perform the initial scan for links.
    scanForLinks();
  };
  
  // Start the process once the document is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
