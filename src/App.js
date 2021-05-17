import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {TableOfContent} from "./components/TableOfContent";
import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [activeEntityId, setActiveEntityId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/HelpTOC.json');
      return response.json();
    }

    fetchData().then((data) => {
      setActiveEntityId(getTocEntityIdFromURL(data));
      setData(data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>

        <div className="App-container">
          <aside className="App-aside">
            <TableOfContent
              tocData={data}
              activeItemId={activeEntityId}
            />
          </aside>

          <Switch>
            <Route path="*">
              <div className="App-main"></div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const getTocEntityIdFromURL = (data) => {
  if (data == null) return null;

  const {pathname, hash} = window.location;
  const re = new RegExp('[^\\/]+(?=\\/$|$)'); // http://localhost:3000/working-with-projects.html –> working-with-projects.html
  let url = pathname.match(re) != null ? pathname.match(re)[0] : null;

  if (url !== null && Object.values(data['entities']['pages']).length > 0) {
    const page = Object.values(data['entities']['pages']).filter((page) => page['url'] === url)[0];

    if (hash !== '' && page['anchors'].length > 0) {
      const anchorIds = page['anchors'].filter((anchor) => {
        const re = new RegExp(`${hash}$`);
        return re.test(anchor)
      });

      return anchorIds[0];
    } else {
      return page['id'];
    }
  }
}

export default App;
