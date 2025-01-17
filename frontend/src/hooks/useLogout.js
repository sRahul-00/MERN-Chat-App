import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/logout",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
            })

            const data = await res.json();
            // console.log(data);

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user", null);
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message);
        } finally {
            toast.success('Logged Out');
            setLoading(false);
        }
    }

    return {loading, logout};
}
export default useLogout