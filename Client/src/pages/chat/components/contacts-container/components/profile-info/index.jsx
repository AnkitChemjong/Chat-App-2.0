import React, { useEffect } from 'react';
import {Avatar,AvatarImage} from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import { getColor } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FiEdit2 } from 'react-icons/fi';
import { IoPowerSharp } from 'react-icons/io5';
import apiClient from '@/lib/api-client';


const ProfileInfo = () => {
  const navigate=useNavigate();
  const {userInfo,setUserInfo}=useAppStore();
  useEffect(()=>{
    let timer;
    const handleDelete=()=>{
      if(document.hidden){
      timer=setTimeout(()=>{

        logOut()
      },1*60*1000);
      }
       else{
          clearTimeout(timer);
       }
    }
    document.addEventListener("visibilitychange",handleDelete);

    return ()=>{
      document.removeEventListener("visibilitychange",handleDelete);
      clearTimeout(timer);
    }
  },[]);

    const logOut=async()=>{
   try{
    await apiClient.delete(LOGOUT_ROUTE,{withCredentials:true}).then((response)=>{
       if(response.status===200){
        setUserInfo(null);
        navigate("/auth");
       }
    }).catch((error)=>{});
   }
   catch(error){
    console.log(error);
   }
    }


  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between 
    px-10 w-full bg-[#2a2b33]'>
    <div className="flex gap-3 items-center justify-center">
        <div className='w-12 h-12 relative'>
        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {
                  userInfo.image? <AvatarImage src={`${HOST}/${userInfo.image}`} alt="profile" 
                  className="object-cover w-full h-full bg-black"
                  /> :<div className={`uppercase h-12 w-12  text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>

                    {userInfo.firstName? userInfo.firstName.split("").shift():userInfo.email.split("")[0]}
                  </div>
                }
                </Avatar> 
        </div>
        <div>
            {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`:""}
        </div>
    </div>  
    <div className='flex gap-5'>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FiEdit2 className="text-purple-500 font-medium"
         onClick={()=>{
           navigate('/profile')
         }}
        />
    </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
     Edit Profile
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <IoPowerSharp className="text-red-500 font-medium"
         onClick={()=>{
           logOut();
           navigate('/auth');
         }}
        />
    </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
      Logout
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


    </div> 
    </div>
  )
}

export default ProfileInfo
