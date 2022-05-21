let color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)
})

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  console.log('reason:', reason)

  if (reason === 'install') {
    console.log('on install')

    chrome.tabs.create({
      url: 'onboarding.html'
    })
  } else if (reason === 'update') {
    console.log('on update')
    chrome.tabs.create({
      url: 'onboarding.html'
    })
  }
})
