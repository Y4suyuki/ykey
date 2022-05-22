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

chrome.tabs.onCreated.addListener((tab) => {
  console.log('%ctab is created!', 'color: green;')
  console.log(tab)

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['dist/content-script.js']
  })
})

chrome.tabs.onUpdated.addListener((tabId) => {
  console.log(`%ctab[${tabId}] is updated!`, 'color: green;')

  chrome.scripting.executeScript({
    target: {tabId: tabId},
    files: ['dist/content-script.js']
  })
})
