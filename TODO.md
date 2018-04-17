## Tasks
* Clicking the extension toggles TabbyCat functionality across all tabs - done
* When the extension is "on," new tabs and pages that are newly navigated to should still have showTabs applied - done
* Add confirmation dialog before refresh because user might lose data - done
* Add try/catch blocks to deal with runtime errors
* Add support for local files - done
* Make *TAB* show up in red - done
* Add a MutationObserver to support dynamic pages
* Parametrize confirmation dialog in Options
* Parametrize the way tabs are rendered, maybe just the colour

## Design decisions
* Decide how to alternatively render tab characters - *TAB*
* How to deal with text that is rendered that way before the extension was applied? - just reload the page
* Consider making activeTab version of TabbyCat / parametrize it
