// ==UserScript==
// @name         IFIS special web tabs
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Remove header and footer from web tabs
// @updateURL    https://gist.githubusercontent.com/jeznag/c33fdb11c6ec42797a0df8730587c142/raw/gistfile1.txt
// @author       Jeremy Nagel - Modified by Keaton Hawkins
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
(function () {
    "use strict";

    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    let currentLocation;
    function handlePage() {

        currentLocation = window.location.href;
        const LOCAL_STORAGE_KEY = "currentCRMAutofill";
        if ((location.href.includes("https://crm.zoho.com") || location.href.includes("crmsandbox.zoho.com") || location.href.includes("https://crmplus.zoho.com"))) {

            if (location.href.includes('tab/Leads/')) {
            deleteElementWhenItAppears('#backArrowDV');
            }

            if (location.href.includes('tab/Leads/custom-view/')) {
                runCodeWhenElementAppears('td:contains(Warm)', () => {
                    window.$('td:contains(Warm)').each((idx, el) => {
                        el.style.backgroundColor = '#fbee64';
                    });
                });
                 runCodeWhenElementAppears('td:contains(Cold)', () => {
                    window.$('td:contains(Cold)').each((idx, el) => {
                        el.style.backgroundColor = '#73b4f9';
                    });
                });
                 runCodeWhenElementAppears('td:contains(Hot)', () => {
                    window.$('td:contains(Hot)').each((idx, el) => {
                        el.style.backgroundColor = '#f41313';
                    });
                });
            }
        }
    }

     function deleteElementWhenItAppears(selector) {
      const checkingInterval = setInterval(() => {
         const element = window.$(selector);
          if (element.length) {
              element.remove();
              clearInterval(checkingInterval);
          }
      }, 50);
    }


    function runCodeWhenElementAppears(selector, callback) {
        const checkingInterval = setInterval(() => {
            const element = window.$(selector);
            if (element.length) {
              callback();
              clearInterval(checkingInterval);
            }
        }, 50);
    }

    setInterval(() => {
        if (currentLocation !== window.location.href) {
            handlePage();
        }
    }, 500);
})();