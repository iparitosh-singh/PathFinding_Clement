import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./App.scss";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App;
