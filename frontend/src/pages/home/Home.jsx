import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/Sidebar"

const Home = () => {
  return (
    <div className="flex xs:h-[450px] md:h-[550px] rounded-lg bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-0 bg-clip-padding overflow-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
export default Home