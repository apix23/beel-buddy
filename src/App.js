import React from 'react';
import "./directoring.css";
import BuddiesForm from "./BuddiesForm";
import StudentForm from "./StudentForm"
import Homepage from './Homepage';
import ThankYou from './ThankYou';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AdminTable from './AdminTable';

//Main Site
function App(){
  return(
    <div className="App">
        
        <Router>
        <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/BuddiesForm">
              <BuddiesForm/>
            </Route>
            <Route path="/StudentForm">
              <StudentForm/>
            </Route>
            <Route path="/ThankYou">
              <ThankYou/>
            </Route>
            <Route path="/Login">
              <Login/>
            </Route>
            <ProtectedRoute 
              path="/AdminTable"
              component={AdminTable}
            />
          </Switch>
      </Router>
            
    </div>
  );
}
export default App;




