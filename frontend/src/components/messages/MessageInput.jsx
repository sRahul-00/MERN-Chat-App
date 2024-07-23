import { useState } from "react";
import { BsSend } from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input type="text" placeholder="Send a message..." 
          className="w-full border border-gray-500 bg-gray-700 rounded-lg p-2.5 block text-sm"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />

        <button className="absolute inset-y-0 end-0 pe-3 flex items-center">
          {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput