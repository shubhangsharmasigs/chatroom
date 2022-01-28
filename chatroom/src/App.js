import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Switch, Route,useHistory,Redirect} from 'react-router-dom'; 
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { useEffect } from 'react';


function App() {

  const [{user}, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);
      if(authUser){
        // means the user is logged in or was logged in
        dispatch({
          type: "SET_USER",
          user:authUser.user
        })

      }
      else{
        // the user is logged out
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  }, [])
  // useEffect(() => {
  //   if(!user){
  //     // history.replace('/');
  //     <Redirect to="/" />
  //     console.log(history);
  //   }
  // },[user])
  return (
    <div className="app">
      

      <div className="app-body">
        <Router>
          <Switch>
           
            <Route path='/rooms/:roomId'>
             <Sidebar />
              <Chat />
            </Route>
            <Route path ='/body'>
               <Sidebar />
               <Chat />
            </Route>
            <Route path='/'>
             <Login />
           </Route>
          </Switch>
        </Router>

        
        
      </div>
    </div>
  );
}

export default App;
