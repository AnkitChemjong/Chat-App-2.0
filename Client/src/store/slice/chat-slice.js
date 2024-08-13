
export const createChatSlice=(set)=>(
    {
        selectedChatType:undefined,
        selectedChatData:undefined,
        selectedChatMessage:[],
        setSelectedChatType:(selectedChatType)=>set({selectedChatType}),
        setSelectedChatData:(selectedChatData)=>set({selectedChatData}),
        setSelectedChatMessage:(selectedChatMessage)=>set({selectedChatMessage}),
        closeChat:()=>set({selectedChatData:undefined,selectedChatType:undefined,selectedChatMessage:[]})
    }
);