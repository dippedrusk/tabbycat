
'use strict';

chrome.runtime.onInstalled.addListener(function() {

  // defaults
  chrome.storage.local.set({showTabs: false}, function() { });
  chrome.browserAction.setBadgeText({text: ''});
  chrome.browserAction.setBadgeBackgroundColor({color: '#008000'})
  let file = 'showTabs.js';

  let URL_patt = new RegExp('https?://.*/.*');

  function executeScript(id) {
    chrome.tabs.executeScript(id, {
      file: file
    }, function(results) { // callback for debugging
      results.forEach(function(result) {
        console.log(result);
      });
    });
  }

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      if (changeInfo.url && URL_patt.test(changeInfo.url)) {
        executeScript(tabId);
      }
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    // toggle showTabs and change the source called
    chrome.storage.local.get('showTabs', function(data) {
      if (!data.showTabs) {
        file = 'showTabs.js';
        chrome.browserAction.setBadgeText({text: 'ON'});
      } else {
        file = 'hideTabs.js';
        chrome.browserAction.setBadgeText({text: ''});
      }

      chrome.storage.local.set({showTabs: !(data.showTabs)});
    });

    chrome.tabs.query({url: ['http://*/*', 'https://*/*']}, function(tabs) {
      tabs.forEach(function(t) {
        executeScript(t.id);
      });
    });
  });

});
