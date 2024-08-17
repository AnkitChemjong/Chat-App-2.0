import { useAppStore } from '@/store'
import React from 'react'

const ContactList = ({contacts,isChannel=false}) => {

    const {selectedChatData,setSelectedChatData,
        setSelectedChatType, selectedChatType,
    setSelectedChatMessages}
        =useAppStore();

    const handleClick=(contact)=>{
      if(isChannel){
        setSelectedChatType("channel");
      }else{
        selectedChatType("contact")
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
            <div key={contact._id}>
                {contact._id}
            </div>
        )
       })}
    </div>
  )
}

export default ContactList
