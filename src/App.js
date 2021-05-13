import './App.css';
import {TableOfContent} from "./components/TableOfContent";

function App() {

  return (
    <div className="App">
      <header className="App-header"></header>

      <aside className="App-aside">
        <TableOfContent />
      </aside>

      <main className="App-main">

        <footer className="App-footer"></footer>
      </main>
    </div>
  );
}

export default App;
