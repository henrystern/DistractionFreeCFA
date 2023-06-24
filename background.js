chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, {
    command: "toggle-cfa-ui"
  })
})
