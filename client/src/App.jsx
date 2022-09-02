import { useState, useEffect } from 'react'
import { Route, useLocation } from "wouter";
import reactLogo from './assets/react.svg'
import './App.css'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

function App() {
  const [location, setLocation] = useLocation();
  const [user, loading] = useAuthState(auth);

  //if the user is not authenticated, redirect to the login page
  useEffect(()=>{
    if(user === null && !loading){
        setLocation("/login");
    }
  }, [user, loading])

  return (
    <div className="App">
      <Route path='/'><Home /></Route>
      <Route path='/login'><Login /></Route>
    </div>
  )
}

export default App
