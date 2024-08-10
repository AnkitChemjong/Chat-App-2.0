import React, { useState } from "react";
import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs,TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.jsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client.js";
import {SIGNUP_ROUTE} from "@/utils/constants.js";
import {LOGIN_ROUTE} from "@/utils/constants.js";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";


const Auth = () => {
  const navigate=useNavigate();
  const {setUserInfo}=useAppStore();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const validateSignup=()=>{
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    if(password!==confirmPassword){
       toast.error("Password and confirm password should be same.")
       return false;
    }
    return true;
  }
  const validateLogin=()=>{
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    return true;
  }

  const handleLogin=async()=>{
    if(validateLogin()){
      const response=await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials: true});
      //console.log(response);
      setUserInfo(response.data.user);
      if(response.data.user?.profileSetup==true){
          navigate('/chat')
      }
      else{
        navigate('/profile')
      }
      
    }
    
  }
  const handleSignup=async()=>{
    if(validateSignup()){
      const response=await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials: true});
      // console.log(response);
      setUserInfo(response.data.user);
      if(response.status===201){
        navigate("/profile");
      }
    }
  }
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div
        className="h-[80vh] bg-white border-2 border-white 
     text-opacity-90 shadow-2xl w-[80vw] md:w[90vw] lg:w-[70vw]
     xl:w[60vw] rounded-3xl grid xl:grid-cols-2"
      >
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">hi</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login"  className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger value="login"
                className="data-[state=active]:bg-transparent text-black text-opacity-90
                border-b-2 rounded-none w-full data-[state=active]:text-black 
                data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 
                 transition-all duration-300">
                  LogIn</TabsTrigger>
                <TabsTrigger value="signup"  className="data-[state=active]:bg-transparent text-black text-opacity-90
                border-b-2 rounded-none w-full data-[state=active]:text-black 
                data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 
                 transition-all duration-300">SignUp</TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 " value="login">
               <Input placeholder="email" type='email' 
               className="rounded-full p-6"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}/>
               <Input placeholder="password" type='password' 
               className="rounded-full p-6"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}/>

               <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>

              <TabsContent className="flex flex-col gap-5 " value="signup">
              <Input placeholder="email" type='email' 
               className="rounded-full p-6"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}/>
               <Input placeholder="password" type='password' 
               className="rounded-full p-6"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}/>
               <Input placeholder="confirmPassword" type='password' 
               className="rounded-full p-6"
               value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}/>
               <Button className="rounded-full p-6" onClick={handleSignup}>Signin</Button>
              </TabsContent>

            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="Background Login and signup"  className="h-[500px]"/>

        </div>
      </div>
    </div>
  );
};

export default Auth;
