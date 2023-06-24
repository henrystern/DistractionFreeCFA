// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
waitForLoad = function(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

styleElementOnLoad = function(selector, styles) {
  waitForLoad(selector).then((el) => {
    Object.assign(el.style, styles)
  })
}

newLink = function(dest, id, text) {
  const link = document.createElement('a')
  link.href = window.location.href.split('#')[0] + dest
  link.innerText = text
  link.id = id
  link.style.margin = ".5rem"
  return link
}

cleanUI = function() {
  styleElementOnLoad('#main-header', { display: 'none' })
  styleElementOnLoad('#navigation', { display: 'none' })
  styleElementOnLoad('.toolbar', { display: 'none' })
  styleElementOnLoad('#viewport3-0', { marginLeft: '0px' })
  waitForLoad('#main-footer').then((footer) => {
    footer.appendChild(newLink("#home", "footer-link-home", "Home"))
    footer.appendChild(newLink("#study-plan/structured", "footer-link-study-plan", "Study Plan"))
    footer.appendChild(newLink("#read/table-of-contents", "footer-link-lessons", "Lessons"))
    footer.appendChild(newLink("#flash-cards", "footer-link-flashcards", "Flashcards"))
    footer.appendChild(newLink("#quiz-selection", "footer-link-practice", "Practice"))
    footer.appendChild(newLink("#game-center", "footer-link-games", "Games"))
    footer.appendChild(newLink("#discussions", "footer-link-discussions", "Discussions"))
    footer.appendChild(newLink("#search", "footer-link-search", "Search"))
  })
}

restoreUI = function() {
  styleElementOnLoad('#main-header', { display: 'block' })
  styleElementOnLoad('#navigation', { display: 'block' })
  styleElementOnLoad('.toolbar', { display: 'block' })
  styleElementOnLoad('#viewport3-0', { marginLeft: '160px' })
  document.getElementById("footer-link-home").remove()
  document.getElementById("footer-link-study-plan").remove()
  document.getElementById("footer-link-lessons").remove()
  document.getElementById("footer-link-flashcards").remove()
  document.getElementById("footer-link-practice").remove()
  document.getElementById("footer-link-games").remove()
  document.getElementById("footer-link-discussions").remove()
  document.getElementById("footer-link-search").remove()
}

toggleUI = function() {
  waitForLoad('#main-header').then((el) => {
    if (el.style.display !== "none") {
      cleanUI()
    } else {
      restoreUI()
    }
  })
}

main = function() {
  waitForLoad('#readings-wrapper').then((reading) => {
    //isReading = reading.offsetParent !== null
    toggleUI()
  })
}

main()
chrome.runtime.onMessage.addListener((message) => {
  if (message.command === "toggle-cfa-ui") {
    toggleUI()
  }
});
