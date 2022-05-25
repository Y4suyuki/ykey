const scrollPitch = 50

const isEngagingInputForm = () => {
  const activeTabName = document.activeElement.tagName

  const inputFormTagNames = [
    "INPUT",
    "TEXTAREA"
  ]

  return inputFormTagNames.some(x => x === activeTabName)
}

const actionWithKey = (e: KeyboardEvent) => {
  console.log(`code: ${e.code}`)
  switch (e.code) {
    case 'KeyJ':
      window.scrollBy(0, scrollPitch)
      break
    case 'KeyK':
      window.scrollBy(0, -scrollPitch)
      break
    case 'BracketRight':
      chrome.runtime.sendMessage({action: "NextTab"}, async function(res) {
        console.log(res)
      })
      break
    case 'BracketLeft':
      chrome.runtime.sendMessage({action: "PreviousTab"}, async function(res) {
        console.log(res)
      })
      break
    default:
      console.log("%cno match", "color: green;")
  }
}

console.log("load content-script.ts")

window.addEventListener('click', function(e) {
  console.log('%c!! firing mouse click event', 'color: green;')
  console.log(e)
})

window.addEventListener('keydown', function(e) {
  if (isEngagingInputForm()) {
    return
  }
  actionWithKey(e)
})
