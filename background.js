
'use strict';

let promptUser = true;
let confirmMessage = 'Turning off TabbyCat will reload this tab and you may lose data. Continue?';

function startUp() {
  // defaults
  chrome.browserAction.setBadgeText({text: ''});
  chrome.browserAction.setBadgeBackgroundColor({color: '#008000'});
  chrome.storage.sync.set({promptUser: true}, function() {});

  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.browserAction.getBadgeText({tabId: tab.id}, function(showTabs) {
      if (showTabs === 'ON') {
          // user trying to turn off TabbyCat
          chrome.storage.sync.get(['promptUser'], function(result) {
              if (result.promptUser && !window.confirm(confirmMessage)) {
                  return;
              }
          });
          chrome.browserAction.setBadgeText({text: '', tabId: tab.id});
          chrome.tabs.reload(tab.id);
      } else {
          chrome.browserAction.setBadgeText({text: 'ON', tabId: tab.id});
          chrome.tabs.executeScript(tab.id, {
            file: 'showTabs.js'
          });
      }
    });
  });
}

chrome.runtime.onInstalled.addListener(startUp);
