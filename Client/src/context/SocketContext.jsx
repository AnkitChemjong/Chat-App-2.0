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
    const {userInfo,selectedChatData,selectedChatType,addMessage}=useAppStore();
    useEffect(()=>{
        if(userInfo){
            socket.current= io(HOST,
                {
                   withCredentials:true,
                   query:{userId:userInfo._id}
               }
            )
            socket.current.on("connect",()=>{
                console.log("Connected to socket Server");
            });

     const handleReceiveMessage=(message)=>{
         if(selectedChatType!==undefined && 
            (selectedChatData._id===message.sender._id||selectedChatData._id===message.recipient._id)){
            console.log("hi",message)
           addMessage(message)
         }
     }
     socket.current.on("receiveMessage",handleReceiveMessage);

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