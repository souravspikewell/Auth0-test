import React from "react";
import { useState } from "react";
import {
  AUTH0_LOGIN_REDIRECT_URI,
  AUTH0_LOGIN_RESPONSE_TYPE,
  AUTH0_REALM,
} from "./config";
import { auth } from "./services/auth0.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Grid, TextField, Typography } from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    connection: AUTH0_REALM,
    redirectUri: AUTH0_LOGIN_REDIRECT_URI,
    responseType: AUTH0_LOGIN_RESPONSE_TYPE,
  });
  const [showForm, setShowForm] = useState(true);
  const successToast = () => toast.success("Login Successful");
  const failureToast = () => toast.error("Login Unsuccessful");
  const inputHandler = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const authCallback = (error, result) => {
    if (error) {
      console.log("Login Unsuccessful");
      console.log(error);
      failureToast();
      setShowForm(true);
      return;
    } else {
      successToast();
      window.location.href = "https://staging.connectorNet.us/#/admin";
      console.log("Login Successful");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowForm(false);
    auth.login(formData, authCallback);
  };

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
        <div className="w-9/12 m-auto bg-white rounded-md drop-shadow-2xl">
          {showForm ? (
            <>
              {/* <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1> */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ textAlign: "center", backgroundColor:"#4835d4" }} className="py-32 rounded-md" >
                  <Grid container >
                    <Grid item xs={12} sx={{paddingTop:6}}>
                    <div className="flex items-center justify-center">
                      <img
                        src="assets/logos/ConnectorNet-Logo-Vert-White.png"
                        width={"60%"}
                        alt="connectornet logo"
                      />
                    </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className="flex items-center rounded-md bg-white">
                  <Grid container>
                  <Grid item xs={12} sx={{textAlign:"center"}}>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "24px", marginTop: 2, color:"#4835d4"}}
                      >
                        Welcome To ConnectorNet
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{textAlign:"center"}}>
                      <Typography variant="caption" sx={{ fontSize: "16px", color:"#4835d4" }}>
                        Please login to continue
                      </Typography>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                      <Typography>Email*</Typography>
                      <TextField
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Mail id here"
                        value={formData.email}
                        onChange={(e) => inputHandler(e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                      <Typography sx={{marginTop:1}}>Password*</Typography>
                      <TextField
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your Password here"
                        value={formData.password}
                        onChange={(e) => inputHandler(e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                      <a href="/" className="text-xs text-blue-600 hover:underline">
                        Forgot Password?
                      </a>
                    </Grid>
                    <Grid item xs={12}>
                    <Box>
                      <div className="mt-3 text-center">
                        <button
                          className="w-1/3 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500"
                          onClick={(e) => submitHandler(e)}
                        >
                          Login
                        </button>
                      </div>
                    </Box>

                    <p className="mt-2 text-xs font-light text-center text-blue-600">
                      {" "}
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        className="font-medium text-purple-600 underline"
                      >
                        Sign up
                      </a>
                    </p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <div className="flex items-center justify-center">
                  <img src="assets/loaders/Spinner-px.gif" height={"140vh"} />
                </div>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography sx={{ paddingTop: 2 }}>
                  Please wait while we authenticate your credentials
                </Typography>
              </Grid>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
