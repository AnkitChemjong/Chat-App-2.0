import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {FaPlus} from 'react-icons/fa';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { animationDefaultOptions } from '@/lib/utils';
import Lottie from 'react-lottie';
import apiClient from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area";
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";

const NewDm = () => {
  const {setSelectedChatData,setSelectedChatType}=useAppStore();
    const [openNewContactModal,setOpenNewContactModal]=useState(false);
    const [searchedContacts,setSearchedContacts]=useState([]);

    const searchContacts=async (searchTerm)=>{
    try{
             if(searchTerm.length>0){
              const response=await apiClient.post(SEARCH_CONTACTS_ROUTES,{searchTerm},{
                withCredentials:true
              })
              if(response.status===200 && response.data.contacts){
                setSearchedContacts(response.data.contacts);
              }
             }
             else{
              setSearchedContacts([]);
             }
    }
    catch(e){
      console.log(e);
    }
    }
    const selectNewContact=(contact)=>{
         setOpenNewContactModal(false);
         setSelectedChatType("contact");
         setSelectedChatData(contact);
         setSearchedContacts([]);
        //  console.log(contact);
    }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
           <FaPlus className="text-neutral-400 font-light text-opacity-90 
           text-small hover:text-neutral-100 cursor-pointer transition-all duration-300"
           onClick={()=>setOpenNewContactModal(true)}
           />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={()=>{
        setOpenNewContactModal(false)
        setSearchedContacts([])
      }
        }>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle>Please Select a contact</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>
    <div>
        <Input onChange={e=>searchContacts(e.target.value)} placeholder="Search Contacts" className="rounded-lg p-6 border-none bg-[#1c1b1e]"/>
    </div>
    {
      searchedContacts.length>0 && (
    <ScrollArea className="h-[250px] ">
      <div className="flex flex-col gap-5">
        {searchedContacts.map((contact) =>{
          return (

          <div onClick={()=>selectNewContact(contact)} key={contact._id} className="flex gap-3 items-center cursor-pointer">
               <div className='w-12 h-12 relative'>
        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {
                  contact.image? <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" 
                  className="object-cover w-full h-full bg-black rounded-full"
                  /> :<div className={`uppercase h-12 w-12  text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>

                    {contact.firstName? contact.firstName.split("").shift():contact.email.split("")[0]}
                  </div>
                }
                </Avatar> 
        </div>
        <div className="flex flex-col">
            <span>
            {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}`:contact.email}
            </span>
            <span>{contact.email}</span>
        </div>
          </div>
          )
        })}
      </div>
      </ScrollArea>
      )
    }
    {
        searchedContacts.length<=0 && 
        (
            <div className="flex-1  md:flex mt-5 md:mt-0 flex-col justify-center items-center duration-1000 transition-all">
     <Lottie
     isClickToPauseDisabled={true}
     height={100}
     width={100}
     options={animationDefaultOptions}
     />
     <div className='text-opacity-80 text-white flex flex-col gap-5 
     items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
        <h3 className='poppins-medium'>

            Hi <span className='text-purple-500'>!</span> Search new
            <span className='text-purple-500'> Contact.</span>
        </h3>
     </div>
    </div>
        )
        
    }
  </DialogContent>
</Dialog>

    </>
  );
};

export default NewDm;
