browser.browserAction.onClicked.addListener(function (tab) {
  browser.tabs.sendMessage(tab.id, {
    command: "toggle-cfa-ui"
  })
})
