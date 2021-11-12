import './App.css';
import ItemData from './Components/ItemData';
import Login from './Components/Login';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Dash from './Components/Dash';
import { useEffect } from 'react';


function App() {

  let userid = JSON.parse(localStorage.getItem('userid'));

  useEffect(() => {
    console.log(userid, '===================================')
  }, []);

  return (
    <div className="App">
      <BrowserRouter>

        <Switch>

          <Route exact path="/" component={Login} />
          <Route exact path="/itemdata" component={ItemData} />
          <Route exact path="/dash" component={Dash} />

        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;


