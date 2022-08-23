import { useEffect, useState } from "react"
import * as ReactDOM from "react-dom/client"

const App = () => {
  const ok = "✅"
  const ng = "🚫"
  let cond = true
  const [url, setUrl] = useState(window.location.href)
  const handleClick = () => {
    const hostname = new URL(url).hostname
    console.log("handleClick!")
    chrome.storage.sync.get("ignoreHosts", ({ ignoreHosts }) => {
      if (ignoreHosts.some((x: string) => x === hostname)) {
        console.log("do nothing!")
        return
      }
      console.log("setting ignoreHosts")
      chrome.storage.sync.set({ignoreHosts: [hostname]})
    })
  }
  useEffect(() => {
    chrome.storage.sync.get("ignoreHosts", ({ ignoreHosts }) => {
      console.log("ignoreHosts:", ignoreHosts)
    })
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabs) => {
      const [tab] = tabs
      setUrl(tab.url)
    })
  }, [url, setUrl])
  return <div className="App">
    <div>Hello world</div>
    <div onClick={handleClick} style={{cursor: "pointer"}}>{cond ? ok : ng}{url}</div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<App />)
