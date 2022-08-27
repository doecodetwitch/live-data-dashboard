import { useState, useEffect } from 'react'
import { Route } from "wouter";
import reactLogo from './assets/react.svg'
import './App.css'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

function App() {

  return (
    <div className="App">
      <Route path='/'><Home /></Route>
      <Route path='/login'><Login /></Route>
    </div>
  )
}

export default App
