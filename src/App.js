// Installations => npm react-router-dom@5.3.1

import './App.css'
import Feed from "./components/Feed"
import Login from "./components/Login"
// import Pagenotfound from "./components/Pagenotfound"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
import {Switch, Route} from "react-router-dom"
import { AuthProvider } from './context/Authcontext'
import PrivateRoute from './components/Privateroute'
import Forgetpassword from './components/Forgetpassword'

function App() {
  return (
    <AuthProvider>
    <Switch>
      
      <Route path="/login">
        <Login/>
      </Route>

      <Route path="/signup">
        <Signup/>
      </Route>

      <Route path="/forgetpassword">
        <Forgetpassword/>
      </Route>

      <PrivateRoute path="/profile/:id" exact component={Profile}/>  {/* 'id' is a parameter */}

      <PrivateRoute path="/" exact component={Feed}/>
      

    </Switch>
    </AuthProvider>
  );
}

export default App;
