// ==UserScript==
// @name         Crunchyroll 0 Generique
// @description  Saute les openings et les credits pour passer directement a la suite et eviter les spoilers post-generique.
// @match        *://*.crunchyroll.com/*
// @author       ni.binks
// @namespace    ni-binks
// @version     1.0.0
// @grant        none
// @contributionURL https://ni-ninks.netlify.app/
// @contributionAmount 1
// ==/UserScript==

(function() {
    let isSkipping = false;

    const observer = new MutationObserver(() => {
        if (isSkipping) return;

        const skipBtn = document.querySelector('div[data-testid="skipButton"]  div[tabindex="0"]');
        if (!skipBtn) return;

        const label = (skipBtn.getAttribute('aria-label') || skipBtn.textContent || '').trim().toUpperCase();
        if (!label.includes("CRÉDITS")) {
            skipBtn.click();
        } else {
            isSkipping = true;

            setTimeout(() => {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'n',
                    keyCode: 78,
                    shiftKey: true,
                    bubbles: true
                }));
                setTimeout(() => { isSkipping = false; }, 3000);
            }, 2000);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
