import React,{useState,useEffect,useRef} from 'react';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import {IoArrowBack} from 'react-icons/io5';
import {Avatar,AvatarImage} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getColor,colors } from '@/lib/utils.js';
import {FaPlus,FaTrash} from 'react-icons/fa';
import { toast } from 'sonner';
import apiClient from '@/lib/api-client.js';
import { ADD_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants';

const Profile = () => {
   const navigate=useNavigate();
  const {userInfo,setUserInfo}=useAppStore();
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [image,setImage]=useState(null);
  const [hovered,setHovered]=useState(false);
  const [selectedColor,setSelectedColor]=useState(0);
  const fileInputRef=useRef(null);

  const validateProfile=()=>{
    if(!firstName){
      toast.error("First name is required")
      return false;
    }
    if(!lastName){
      toast.error("last name is required")
      return false;
    }
    return true;
  }

  useEffect(()=>{
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
  },[userInfo])

  const saveChanges=async()=>{
    if(validateProfile()){
     try{
           const response=await apiClient.post(UPDATE_PROFILE_ROUTE,
            {firstName,lastName,color:selectedColor},
            {withCredentials:true});

            if(response.status===200 && response.data){
              setUserInfo(response.data.user);
              toast.success("Profile updated successfully")
              navigate('/chat')

            }
     }
     catch(e){console.log(e);}
    }

  }
  const handleFileInputClick=()=>{
    fileInputRef.current.click();
  }

  const handleImageChange=async (e)=>{
    const file=e.target.files[0];

    if(file){
      const formData=new FormData();
      formData.append("profile-image",file);
      const response=await apiClient.post(ADD_PROFILE_IMAGE_ROUTE,formData,
        {headers:{
          "Content-Type":'multipart/form-data'
        },withCredentials:true
      })
      if(response.status===200 && response.data.image){
        setUserInfo({...userInfo,image:response.data.image});
        toast.success("Image successfully updated");
      }
      // const reader=new FileReader();
      // reader.onload=()=>{
      //   setImage(reader.result);
      // }
      // reader.readAsDataURL(file);
    }
    else{
      toast.error("Select only photos");
    }
   
  }

  const handleDeleteImage=async()=>{

  }
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-mix">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer"/>
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}
          > 
               <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                {
                  image? <AvatarImage src={image} alt="profile" 
                  className="object-cover w-full h-full bg-black"
                  /> :<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[3px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>

                    {firstName? firstName.split("").shift():userInfo.email.split("")[0]}
                  </div>
                }
                </Avatar> 
                 {
                  hovered && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full'
                    onClick={image? handleDeleteImage:handleFileInputClick}>
                      {
                        image? <FaTrash className='text-white text-3xl cursor-pointer'/> :<FaPlus className='text-white text-3xl cursor-pointer'/>
                      }
                    </div>
                  )
                 }
                 <input type="file" ref={fileInputRef}  className="hidden" onChange={handleImageChange}
                 name="profile-image" accept=".png, .jpg, .jpeg, .svg, .webp"/>
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <input type="email" 
              placeholder="Email"
              disabled
              value={userInfo.email}
              className="rounded-lg border-none p-6 bg-[#2c2e3b]" />
            </div>
            <div className="w-full">
              <input type="text" 
              placeholder="First Name"
               onChange={(e)=>setFirstName(e.target.value)}
              value={firstName}
              className="rounded-lg border-none p-6 bg-[#2c2e3b]" />
            </div>
            <div className="w-full">
              <input type="text" 
              placeholder="Last Name"
              onChange={(e)=>setLastName(e.target.value)}
              value={lastName}
              className="rounded-lg border-none p-6 bg-[#2c2e3b]" />
            </div>
            <div className="w-full flex gap-5">
{
  colors.map((color,index)=>{
   return (
    <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
    ${selectedColor===index? "outline outline-white outline-1":""}
    `}
    key={index}
    onClick={()=>setSelectedColor(index)}
    >

    </div>
   )
  })
}
            </div>
          </div>

        </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
           onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
