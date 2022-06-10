import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Admin from './components/admin/Admin'
import User from './components/user/User'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <Router>
      <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<User />} />
            </Routes>
      </div>
    </Router>
  )
}

export default App
