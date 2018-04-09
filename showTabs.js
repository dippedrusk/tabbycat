
'use strict';

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        textNodeReplace(document.body);
    }
}, 10);

function textNodeReplace(node) {
  let walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT
    );

    let textNode;
    while(textNode = walker.nextNode()) {
        let tabAlternateRendering = '<span style="color:red">*TAB*</span>';
        let escapedTabAlternateRendering = escape(tabAlternateRendering);
        let replacedNodeHTML = unescape(escape(textNode.parentElement.innerHTML).replace(/%09/g, escapedTabAlternateRendering));
        textNode.parentElement.innerHTML = replacedNodeHTML;
    }
}
