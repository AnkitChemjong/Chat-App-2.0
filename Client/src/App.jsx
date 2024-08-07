import React from 'react';
import Auth from './pages/auth/index.jsx';
import Chat from './pages/chat/index.jsx';
import Profile from './pages/profile/index.jsx';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

const App = () => {
  return (
   <Router>
    <Routes>
    < Route path='/' element={<Auth/>}/>
     < Route path='/auth' element={<Auth/>}/>
     < Route path='/chat' element={<Chat/>}/>
     < Route path='/profile' element={<Profile/>}/>
    </Routes>
   </Router>
  )
}

export default App
