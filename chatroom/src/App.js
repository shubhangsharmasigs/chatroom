import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

function App() {
  return (
    <div className="app">
      

      <div className="app-body">
        <Router>
          <Switch>
           
            <Route path='/rooms/:roomId'>
             <Sidebar />
              <Chat />
            </Route>
            <Route path ='/'>
               <Sidebar />
               <Chat />
            </Route>
          </Switch>
        </Router>

        
        
      </div>
    </div>
  );
}

export default App;
