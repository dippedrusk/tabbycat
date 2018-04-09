
'use strict';

let URL_patt = new RegExp('https?://.*/.*');
let showTabs = false;
let promptUser = true;
let confirmMessage = 'Turning off TabbyCat will reload all your tabs and you may lose data. Continue?';

function updatedTabListener(tabId, changeInfo, tab) {
  if (changeInfo.url && URL_patt.test(changeInfo.url)) {
    executeScript(tabId);
  }
}

function main() {
    // defaults
    chrome.storage.local.set({showTabs: false}, function() {});
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setBadgeBackgroundColor({color: '#008000'})
    showTabs = false;

    function executeScript(id) {
      if (showTabs) {
        chrome.tabs.executeScript(id, {
          file: 'showTabs.js'
        });
      } else {
        chrome.tabs.reload(id);
      }
    }

    chrome.browserAction.onClicked.addListener(function(tab) {
      chrome.storage.local.get('showTabs', function(data) {
        // user trying to turn off TabbyCat
        if (promptUser && data.showTabs) {
          if (!window.confirm(confirmMessage)) {
            return;
          }
        }

        // toggle showTabs
        if (!data.showTabs) {
          showTabs = true;
          chrome.browserAction.setBadgeText({text: 'ON'});
          chrome.storage.local.set({showTabs: !(data.showTabs)});
          chrome.tabs.onUpdated.addListener(updatedTabListener);
        } else {
          showTabs = false;
          chrome.browserAction.setBadgeText({text: ''});
          chrome.storage.local.set({showTabs: !(data.showTabs)});
          chrome.tabs.onUpdated.removeListener(updatedTabListener);
        }

        chrome.tabs.query({url: ['http://*/*', 'https://*/*']}, function(tabs) {
          tabs.forEach(function(t) {
            executeScript(t.id, !(data.showTabs));
          });
        });
      });
    });
}

chrome.runtime.onInstalled.addListener(main);
chrome.runtime.onStartup.addListener(main);
