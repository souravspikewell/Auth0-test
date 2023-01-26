import './App.css';
import Login from './Login.js';
import Logout from './Logout.js';
import Profile from './Profile.js';
import SignUp from './SignUp.js';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
        <div className="App">
          <Routes>
            <Route exact path = "/" element = { <Login/> }/>
            <Route exact path = "/logout" element = { <Logout/> }/>
            <Route exact path = "/SignUp" element = { <SignUp/> }/>
            <Route exact path = "/authenticate" element = { <Profile/> }/>
          </Routes>
        </div>

    </>
  );
}

export default App;
