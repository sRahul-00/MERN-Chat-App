import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import useGetConversation from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";

const Searchbox = () => {
  const [search, setSearch] = useState("");
  const {conversations} = useGetConversation();
  const {setSelectedConversation} = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search) return;

    if(search.length < 3) return toast.error("Search input must be at least 3 characters long");

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSearch("");
      setSelectedConversation(conversation);
    }
    else{
      toast.error(`No user found with name ${search}`)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center" >
            <input type="search" placeholder="Search..." className=" input input-bordered rounded-full" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button className="btn btn-circle bg-sky-500 text-white" >
                <IoSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    </div>
  )
}
export default Searchbox