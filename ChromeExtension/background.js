console.log("I am background script")


//new tab listener
chrome.tabs.onCreated.addListener(function(tab) {
    console.log(tab)
})

//active tabs listener
chrome.tabs.onActivated.addListener(function(tab) {
    console.log(tab)
})

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
