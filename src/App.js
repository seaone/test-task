import './App.css';
import Toc from "./components/Toc";

function App() {

  return (
    <div className="App">
      <header className="App-header"></header>

      <aside className="App-aside">
        <Toc />
      </aside>

      <main className="App-main">

        <footer className="App-footer"></footer>
      </main>
    </div>
  );
}

export default App;
