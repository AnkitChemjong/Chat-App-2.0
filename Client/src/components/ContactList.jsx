import { useAppStore } from '@/store'
import React from 'react'
import { Avatar,AvatarImage } from './ui/avatar';
import { HOST } from '@/utils/constants';
import { getColor } from '@/lib/utils';

const ContactList = ({contacts,isChannel=false}) => {

    const {selectedChatData,setSelectedChatData,
        setSelectedChatType, selectedChatType,
    setSelectedChatMessages}
        =useAppStore();

    const handleClick=(contact)=>{
      if(isChannel){
        setSelectedChatType("channel");
      }else{
        setSelectedChatType("contact")
        
      }
      setSelectedChatData(contact);
      if(selectedChatData && (selectedChatData._id !== contact._id)){
        setSelectedChatMessages([])
      }
    }

  return (
    <div className='mt-5'>
       {contacts.map(contact=>{
        return (
            <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && (selectedChatData._id===contact._id)? "bg-[#8417ff] hover:bg-[#8417ff]":"hover:bg-[#f1f1f111]"}`}
            onClick={()=>{handleClick(contact)}}>
                <div className='flex gap-5 items-center justify-start text-neutral-300'>
                  {
                    !isChannel && (
                <Avatar className=" h-10 w-10 rounded-full overflow-hidden">
                {
                  contact.image? <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" 
                  className="object-cover w-full h-full bg-black"
                  /> :<div className={`${selectedChatData && (selectedChatData._id===contact._id)? "bg-[#ffffff22] border-2 border-white/70":getColor(contact.color)}  
                  uppercase h-10 w-10 md:h-10 md:w-10  text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>

                    {contact.firstName? contact.firstName.split("").shift():contact.email.split("")[0]}
                  </div>
                }
                </Avatar> 
                    ) 
                  }
                  {
                    isChannel && (
                      <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>
                            {contact.name? contact.name.split("").shift():contact.admin.split("")[0]}
                      </div>
                    )
                  }
                  {
                          isChannel? <span>{contact.name}</span>:<span>{`${contact.firstName} ${contact.lastName}`}</span>
        
                  }
                </div>
            </div>
        )
       })}
    </div>
  )
}

export default ContactList
