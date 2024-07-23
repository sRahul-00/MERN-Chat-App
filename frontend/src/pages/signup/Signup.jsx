import { useState } from "react"
import GenderCheckbox from "./GenderCheckbox"
import useSignup from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading, signup} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  const handleCheckBox = (gender) => {
    setInputs({...inputs, gender});
  }

  return (
    <div className="flex items-center justify-center min-w-96">
      <div className="w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="font-semibold text-3xl text-center text-gray-300">SignUp <span className="text-blue-400"> ChatApp</span></h1>

        <form onSubmit={handleSubmit}>
          <div>
            {/* full name */}
            <label className="label p-2">
              <span className="label-text text-base">Full Name</span>
            </label>
            <input type="text" 
              placeholder="Enter Full Name" 
              className="w-full input input-bordered h-10 placeholder:opacity-50"
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            />

            {/* user name */}
            <label className="label p-2">
              <span className="label-text text-base">User Name</span>
            </label>
            <input type="text" 
              placeholder="Enter User Name" 
              className="input input-bordered w-full h-10 placeholder:opacity-50"
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
            />

            {/* password */}
            <label className="label p-2">
              <span className="label-text text-base">Password</span>
            </label>
            <input type="password" 
              className="w-full input input-bordered h-10 placeholder:opacity-50" 
              placeholder="Enter Password"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />

            {/* confirm password */}
            <label className="label p-2">
              <span className="label-text text-base">Confirm Password</span>
            </label>
            <input type="password" 
              className="w-full input input-bordered h-10 placeholder:opacity-50" 
              placeholder="Enter Password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />

            <GenderCheckbox onClickBox = {handleCheckBox} selectedGender = {inputs.gender} />

            <Link to={"/login"} className="label-text hover:text-blue-300 hover:underline">Already Have An Account?</Link>

            <button className="btn btn-block btn-sm mt-4" disabled={loading} >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Signup"
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup