import { useEffect, useState } from "react"
import * as ReactDOM from "react-dom/client"
import "./style.css"

const App = () => {
  const ok = "✅"
  const ng = "🚫"
  const [url, setUrl] = useState(window.location.href)
  const [isEffect, setIsEffect] = useState(true)

  const handleClick = () => {
    console.log("handleClick!")
    const hostname = new URL(url).hostname
    chrome.storage.sync.get("ignoreHosts", ({ ignoreHosts }) => {
      if (ignoreHosts.some((x: string) => x === hostname)) {
        console.log(`pop out hostname: ${hostname}`)
        chrome.storage.sync.set({ignoreHosts: ignoreHosts.filter((x: string) => x !== hostname)})
        setIsEffect(true)
        return
      }
      console.log("setting ignoreHosts")
      chrome.storage.sync.set({ignoreHosts: [...ignoreHosts, hostname]})
      setIsEffect(false)
    })
  }
  useEffect(() => {
    chrome.storage.sync.get("ignoreHosts", ({ ignoreHosts }) => {
      console.log("ignoreHosts:", ignoreHosts)
      chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabs) => {
        const [tab] = tabs
        setUrl(tab.url)
        const hostname = new URL(tab.url).hostname
        setIsEffect(!ignoreHosts?.some((x: string) => x === hostname))
      })
    })
  }, [url, setUrl, setIsEffect])
  return <div className="App">
    <div>Hello world</div>
    <div onClick={handleClick} style={{cursor: "pointer"}}>{isEffect ? ok : ng}{url}</div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<App />)
