import React from "react";
import { useState } from "react";
import { AUTH0_LOGIN_REDIRECT_URI, AUTH0_LOGIN_RESPONSE_TYPE, AUTH0_REALM } from "./config";
import { auth } from "./services/auth0.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FidgetSpinner } from "react-loader-spinner";


function Login() {

    const [formData, setFormData] = useState({
      email:"",
      password:"",
      connection:AUTH0_REALM,
      redirectUri:AUTH0_LOGIN_REDIRECT_URI,
      responseType: AUTH0_LOGIN_RESPONSE_TYPE
    })
    const [showForm, setShowForm] = useState(true)

    const successToast = () => toast.success("Login Successful")
    const failureToast = () => toast.error("Login Unsuccessful")

    const inputHandler = (e) => {
      const name = e.target.id;
      const value = e.target.value;
      setFormData({...formData, [name]:value})
    }

    const authCallback = (error,result) =>{
      if(error){
        console.log("Login Unsuccessful")
        console.log(error)
        failureToast();
        setShowForm(true)
        return;
      }
      else{
        successToast();
        console.log("Login Successful")
      }
    }

    const submitHandler = (e) => {
      e.preventDefault();
      console.log(formData)
      setShowForm(false)
      auth.login(formData,authCallback)
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
                   Sign in
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
                        Forgot Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick = {(e) => submitHandler(e)}>
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
          </>
          :
          <div className="content-center text-center flex flex-col justify-center">
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
          </div>}
            </div>
        </div>
      </> 
    );
  }
  
  export default Login;
  