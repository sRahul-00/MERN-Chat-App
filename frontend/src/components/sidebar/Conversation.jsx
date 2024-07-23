import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"

const Conversation = ({conversation, emoji, lastIndex}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {onlineUsers} = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = (selectedConversation?._id === conversation._id);

  return (
    <>
      <div className={`cursor-pointer flex items-center p-2 gap-2 rounded hover:bg-sky-500 ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline ? 'online' : ''}`} >
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex  justify-between">
            <h4 className="font-bold text-gray-300">{conversation.fullName}</h4>
            <p className="text-xl">{emoji}</p>
          </div>
        </div>
      </div>

      {/* divider */}
      {
        !lastIndex && <div className="divider my-0 py-0 h-1"></div>
      }
    </>
  )
}
export default Conversation