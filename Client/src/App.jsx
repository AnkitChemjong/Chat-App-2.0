import React, { useEffect, useState } from 'react';
import Auth from './pages/auth/index.jsx';
import Chat from './pages/chat/index.jsx';
import Profile from './pages/profile/index.jsx';
import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useAppStore } from './store/index.js';
import apiClient from './lib/api-client.js';
import { GET_USER_INFO } from './utils/constants.js';

const PrivateRoute=({children})=>{
 const {userInfo}=useAppStore();
 const isAuthenticated=!!userInfo;
 return isAuthenticated? children:<Navigate to="/auth"/>;
};
const AuthRoute=({children})=>{
  const {userInfo}=useAppStore();
  const isAuthenticated=!!userInfo;
  return isAuthenticated? <Navigate to="/auth"/>:children;
 };
 
 const App = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
   const getUserData=async()=>{
     try{
      const response=await apiClient.get(GET_USER_INFO,{withCredentials:true});
      console.log(response);
      if(response.status===200){

        setUserInfo(response.data.user);
      }
      else{
        setUserInfo(undefined);
      }
     }
     catch(err){
      setUserInfo(undefined);
     }
     finally{
       setLoading(false);
     }
   }
   if(!userInfo){
    getUserData();
   }
   else{
    setLoading(false);
   }
  },[userInfo]);
  if(loading){
    return <div>Loading</div>
  }
  return (
   <Router>
    <Routes>
    < Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>}/>
     < Route path='/' element={<Auth/>}/>
     < Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
     < Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
    </Routes>
   </Router>
  )
}

export default App
