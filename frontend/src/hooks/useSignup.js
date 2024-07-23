import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});

        if(!success){
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json();

            if(data.error) throw new Error(data.error);

            // localStorage
            localStorage.setItem("chat-user", JSON.stringify(data.data));

            // context
            setAuthUser(data.data);

            // console.log(data);
            toast.success('Successfully Registered');
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    return {loading, signup};
}
export default useSignup;

const handleInputErrors = ({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender){
        console.log(fullName, username, password, confirmPassword, gender);
        toast.error('Please Fill In All The Fields');
        return false;
    }

    if(password !== confirmPassword){
        toast.error('Password Doesn\'t Match');
        return false;
    }

    if(password.length < 6){
        toast.error('Password Must Be Of At Least 6 Characters');
        return false;
    }

    return true;
}