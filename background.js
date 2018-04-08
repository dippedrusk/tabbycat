
'use strict';

chrome.runtime.onInstalled.addListener(function() {

  // defaults
  chrome.storage.local.set({showTabs: false}, function() { });
  chrome.browserAction.setBadgeText({text: ''});
  chrome.browserAction.setBadgeBackgroundColor({color: '#008000'})
  let code = 'document.body.style.backgroundColor="white"';

  function executeScript(id) {
    console.log(code);
    chrome.tabs.executeScript(id, {
      code: code
    });
  }

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      if (changeInfo.url) {
        executeScript(tabId);
      }
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    // toggle showTabs and change the source called
    chrome.storage.local.get('showTabs', function(data) {
      if (!data.showTabs) {
        code = 'document.body.style.backgroundColor="red"';
        chrome.browserAction.setBadgeText({text: 'ON'});
      } else {
        code = 'document.body.style.backgroundColor="white"';
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
