import { useAppStore } from '@/store';
import {RiCloseFill} from 'react-icons/ri';
import { Avatar,AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { HOST } from '@/utils/constants';

const ChatHeader = () => {

const {closeChat,selectedChatData,selectedChatType}=useAppStore();

  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
      <div className="flex gap-5 items-center w-full justify-between">
        <div className='flex items-center gap-3 justify-center '>

        <div className='w-12 h-12 relative md:top-0 top-2'>
          {
            selectedChatType==="contact"? (
              <Avatar className=" h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden">
              {
                selectedChatData.image? <AvatarImage src={`${HOST}/${selectedChatData.image}`} alt="profile" 
                className="object-cover w-full h-full bg-black"
                /> :<div className={`uppercase h-8 w-8 md:h-12 md:w-12  text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(selectedChatData.color)}`}>

                  {selectedChatData.firstName? selectedChatData.firstName.split("").shift():selectedChatData.email.split("")[0]}
                </div>
              }
              </Avatar> 
            ):(
              <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>
              {selectedChatData.name? selectedChatData.name.split("").shift():selectedChatData.admin.split("")[0]}
               </div>
            )
          }
        
        </div>
        <div>
          {
            selectedChatType==="channel" && 
            selectedChatData.name
          }
          {selectedChatType==="contact" && 
          selectedChatData.firstName? `${selectedChatData.firstName}  ${selectedChatData.lastName}`:selectedChatData.email}
        </div>


        </div>
<div className="flex items-center justify-center gap-5">
    <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
        <RiCloseFill className='text-3xl'
        onClick={closeChat}/>
    </button>
</div>
      </div>
    </div>
  )
}

export default ChatHeader
