import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputError(username, password);

        if(!success){
            return;
        }
    
        setLoading(true);
    
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({username, password})
            })

            const data = await res.json();

            if(data.error) throw new Error(data.error);

            localStorage.setItem("chat-user", JSON.stringify(data.data));
            setAuthUser(data.data);

            // console.log(data.data);
            toast.success('Successfully Logged In');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, login};
}

const handleInputError = (username, password) => {
    if(!username || !password){
        toast.error('Please Fill In All The Fields')
        return false;
    }

    return true;
}
export default useLogin