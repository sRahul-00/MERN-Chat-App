import { TiMessage, TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  useEffect(() => { 
    return () => setSelectedConversation(null);
  },[setSelectedConversation]);

  return (
    <div className="md:min-w-[550px] flex flex-col">
      { !selectedConversation ? <NoChatSelected /> : (
        <>
          {/* header */}
          <div className="flex items-center gap-2 bg-slate-500 px-4 py-2 mb-2">
              <p className="text-base">To:</p>
              <p className="font-bold text-gray-900">{selectedConversation.fullName}</p>
          </div>
    
          <Messages />
          <MessageInput />
        </>
      )
      
      }
    </div>
  )
}

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return <div className="flex items-center justify-center w-full h-full">
    <div className="flex flex-col px-4 items-center sm:text-lg md:text-xl font-semibold gap-2">
      <p>Welcome 👋 {authUser.fullName} ❄️</p>
      <p>Select a chat to start messaging</p>
      <TiMessages className="text-3xl md:text-6xl text-center" />
    </div>
  </div>
}
export default MessageContainer