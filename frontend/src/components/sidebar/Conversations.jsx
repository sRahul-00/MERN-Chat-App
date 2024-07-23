import useGetConversation from "../../hooks/useGetConversation"
import getRandomEmojis from "../../utils/getRandomEmojis";
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversation();
  console.log("Conversation: ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
        {
          conversations.map((conversation, lastIndex) => {
            // console.log(user);
            return <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmojis()} lastIndex={lastIndex === conversations.length - 1} />
          })
        }
    </div>
  )
}
export default Conversations