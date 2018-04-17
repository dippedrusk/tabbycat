
'use strict';

function saveOptions() {
    let promptUser = document.getElementById('promptUser').checked;

    chrome.storage.sync.set({promptUser: promptUser}, function() {
        let status = document.getElementById('status');
        status.textContent = 'Saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get(['promptUser'], function(result) {
        document.getElementById('promptUser').checked = result.promptUser;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
