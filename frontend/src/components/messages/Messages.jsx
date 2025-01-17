import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message"
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const {loading, messages} = useGetMessages();
  useListenMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
    },100)
  },[messages]);

  // console.log(messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
        {!loading && messages.length > 0 && messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message = {message} />
          </div>))}

        {loading && [...Array(3)].map((_, index) => <MessageSkeleton />)}

        {!loading && messages.length === 0 && <p className="text-gray-400 text-center">Send a message to start the conversation</p>}
    </div>
  )
}
export default Messages