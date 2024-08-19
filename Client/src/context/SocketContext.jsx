import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import {createContext,useContext,useEffect,useRef} from 'react';
import {io} from 'socket.io-client';

const SocketContext=createContext(null);


export const useSocket=()=>{
    return useContext(SocketContext);
}

export const SocketProvider=({children})=>{
    const socket=useRef();
    const {userInfo,addMessage}=useAppStore();
    useEffect(()=>{
        if(userInfo){
            socket.current= io(HOST,
                {
                   withCredentials:true,
                   query:{userId:userInfo._id},
               }
            )
            socket.current.on("connect",()=>{
                console.log("Connected to socket Server");
                // console.log(socket.current.id)
            });

     const handleReceiveMessage=(message)=>{
        const {selectedChatData,selectedChatType}=useAppStore.getState();
         if(selectedChatType!==undefined && 
            (selectedChatData._id===message.sender._id||selectedChatData._id===message.recipient._id)){
                addMessage(message)
            }
         
     }
     const handleReceiveChannelMessage=async(message)=>{
   const {selectedChatData,selectedChatType,addMessage}=useAppStore.getState();
   if(selectedChatType!==undefined && selectedChatData._id===message.channelId){
    addMessage(message);
   }
     }
     socket.current.on("receiveMessage",handleReceiveMessage);
     socket.current.on("receive-channel-message",handleReceiveChannelMessage);

            return ()=>{
                socket.current.disconnect();
            }
        }
    },[userInfo]);

    return (
        <SocketContext.Provider value={{socket:socket.current}}> 
       {children}
        </SocketContext.Provider>
    )
}