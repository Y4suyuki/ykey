import * as ReactDOM from "react-dom"


const App = () => {
  return <div className="App">
    <div>Hello world</div>
    <div>{window.location.href}</div>
  </div>
}


ReactDOM.render(<App />, document.getElementById("app"))
