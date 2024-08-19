import React, { useEffect, useState } from "react";
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
import apiClient from "@/lib/api-client";
import { CREATE_CHANNEL_ROUTES, GET_ALL_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
  const {setSelectedChatData,setSelectedChatType,addChannel}=useAppStore();
    const [newChannelModal,setNewChannelModal]=useState(false);
    const [allContacts,setAllContacts]=useState([]);
    const [selectedContacts,setSelectedContacts]=useState([]);
    const [channelName,setChannelName]=useState("");

    useEffect(()=>{
           const getData=async()=>{
                  const response=await apiClient.get(GET_ALL_CONTACTS_ROUTES,
                    {withCredentials:true});
                    setAllContacts(response.data.contacts);
           }
           getData();
    },[]);

    const createChannel=async()=>{
      try{
        if(channelName.length>0 && selectedContacts.length>0){
           const response=await apiClient.post(CREATE_CHANNEL_ROUTES,{
            name:channelName,
            members:selectedContacts.map((contact)=>contact.value)
           },{withCredentials:true})
              if(response.status===201){
                setChannelName("");
                setSelectedContacts([]);
                setNewChannelModal(false);
                addChannel(response.data.channel);
              }
          }
      }
      catch(e){
        console.log(e);
      }
    }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
           <FaPlus className="text-neutral-400 font-light text-opacity-90 
           text-small hover:text-neutral-100 cursor-pointer transition-all duration-300"
           onClick={()=>setNewChannelModal(true)}
           />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={()=>{
        setNewChannelModal(false)

      }
        }>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle>Please Select the Details for new Channel</DialogTitle>
      <DialogDescription>
        

      </DialogDescription>
    </DialogHeader>
    <div>
        <Input value={channelName} onChange={e=>setChannelName(e.target.value)} placeholder="Channel Name" className="rounded-lg p-6 border-none bg-[#1c1b1e]"/>
    </div>
    <div>
      <MultipleSelector
      className="rounded-lg bg-[#2c2e2b] border-none py-2 text-white"
      defaultOptions={allContacts}
      placeholder="Search Contacts"
      value={selectedContacts}
     onChange={setSelectedContacts}
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600">No Result Found.</p>
      }
      />
     
    </div>
    <div>
      <button onClick={createChannel} className="w-full p-2 rounded-lg bg-purple-700 hover:bg-purple-900 transition-all duration-300">
        Create Channel
      </button>
    </div>
   
  </DialogContent>
</Dialog>

    </>
  );
};

export default CreateChannel;
