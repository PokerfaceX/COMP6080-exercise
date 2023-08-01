import logo from "./logo2.svg";
import "./App.css";
import a from "./hero-svg.avif";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={a} className="App-logo" alt="logo" />
        <p>Pa-ran-nah</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
