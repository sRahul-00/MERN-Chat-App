import Searchbox from "./Searchbox"
import Conversations from "./Conversations"
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const Sidebar = () => {
  const {loading, logout} = useLogout();
  return (
    <div className="flex flex-col border-r border-slate-500 p-4">
        <Searchbox />
        <div className="divider px-3"></div>
        <Conversations />


        {!loading ? (
          <button className="mt-auto text-3xl p-0" onClick={logout}>
              <BiLogOut />
          </button>
        ) : (
          <span className="loading loading-spinner"></span>
        )}
    </div>
  )
}
export default Sidebar