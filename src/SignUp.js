import React from "react";
import { useState } from "react";
import { AUTH0_REALM } from "./config";
import { auth } from "./services/auth0.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";


function SignUp() {

    const [formData, setFormData] = useState({
      email:"",
      password:"",
      connection:AUTH0_REALM
    })
    const [showForm, setShowForm] = useState(true)
    const [showLoader, setShowLoader] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const successToast = () => toast.success("Registration Successful")
    const failureToast = () => toast.error("Registration Unsuccessful")

    const inputHandler = (e) => {
      const name = e.target.id;
      const value = e.target.value;
      setFormData({...formData, [name]:value})
    }

    const authCallback = (error,result) =>{
      if(error){
        console.log("Error in registration")
        console.log(error)
        setShowForm(true)
        setShowLoader(false)
        failureToast();
        return;
      }
      else{
        successToast();
        setShowLoader(false)
        setShowSuccess(true);
        console.log("Registration Successful")
      }
    }

    const submitHandler = (e) => {
      e.preventDefault();
      setShowForm(false)
      setShowLoader(true)
      auth.signup(formData,authCallback)
    }

    return (
      <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          {showForm?<>
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign up
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                          Email
                        </label>
                        <input 
                          type="email" 
                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id = "email"
                          placeholder="Enter your mail id"
                          value={formData.email}
                          onChange={(e) => inputHandler(e)}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input 
                          type="password" 
                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          id = "password"
                          placeholder="Enter your password here"
                          value={formData.password}
                          onChange={(e) => inputHandler(e)}
                        />
                    </div>
                    <a href="/"className="text-xs text-purple-600 hover:underline">
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick = {(e) => submitHandler(e)}>
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign in
                    </a>
                </p>
          </>
          :<></>}
          {showLoader?<>
            <div className="content-center">
            <FidgetSpinner
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              ballColors={['#ff0000', '#00ff00', '#0000ff']}
              backgroundColor="#F4442E"
            />
          </div>
          </>:<></>}
          {showSuccess?<>
            <div className="bg-green-300 h-32 text-center shadow-xl rounded-lg">
              <p className="pt-10">Reistration Successful !! <br/><Link to="/"><button className="bg-blue-500 mt-1 px-2 rounded-lg">Sign in here</button></Link></p>
            </div>
          </>:<></>}
            </div>
        </div>
      </> 
    );
  }
  
  export default SignUp;
  