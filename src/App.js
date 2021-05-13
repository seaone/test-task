import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {TableOfContent} from "./components/TableOfContent";
import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        '/data/HelpTOC.json',
      );

      const data = await result.json()

      setData(data);
    }

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>

        <aside className="App-aside">
          <TableOfContent tocData={data} />
        </aside>

        <Switch>
          <Route path="*">
            <main className="App-main">

              <footer className="App-footer"></footer>
            </main>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
