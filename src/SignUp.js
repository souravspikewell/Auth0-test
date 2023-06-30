import React from "react";
import { useState } from "react";
import { AUTH0_REALM } from "./config";
import { auth } from "./services/auth0.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MuiPhoneNumber from "mui-phone-number";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    connection: AUTH0_REALM,
  });
  const [showForm, setShowForm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentOrganisation, setCurrentOganisation] = useState(false);
  const [showOption, setShowOption] = useState(true);
  const [userRole, setUserRole] = useState("connector");
  const successToast = () => toast.success("Registration Successful");
  const failureToast = () => toast.error("Registration Unsuccessful");

  const inputHandler = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const organisationList = [
    {
      address: "New York 210",
      addressVerified: true,
      cityName: "New York",
      countryCode: "US",
      countryName: "US",
      createdBy: "user",
      description: "string",
      email: "spikewell@mail.com",
      emailVerified: true,
      isApproved: "pending",
      legalDocsVerified: true,
      modifiedBy: "me",
      name: "Spikewell",
      phoneNumber1: "185656654554",
      phoneNumberVerified: true,
      productCount: 0,
      productsServicesVerified: true,
      startDate: "2023-06-29T12:57:27.959Z",
      w9_verified: true,
      website: "https://www.tim.com",
      zipcode: "585643",
    },
    {
      address: "New York 210",
      addressVerified: true,
      cityName: "New York",
      countryCode: "US",
      countryName: "US",
      createdBy: "user",
      description: "string",
      email: "t2group@t2group.us",
      emailVerified: true,
      isApproved: "pending",
      legalDocsVerified: true,
      modifiedBy: "me",
      name: "T2 group",
      phoneNumber1: "185656654554",
      phoneNumberVerified: true,
      productCount: 0,
      productsServicesVerified: true,
      startDate: "2023-06-29T12:57:27.959Z",
      w9_verified: true,
      website: "https://www.t2group.com",
      zipcode: "585643",
    },
  ];

  const authCallback = (error, result) => {
    if (error) {
      console.log("Error in registration");
      console.log(error);
      setShowForm(true);
      setShowLoader(false);
      failureToast();
      return;
    } else {
      successToast();
      setShowLoader(false);
      setShowSuccess(true);
      console.log("Registration Successful");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowLoader(true);
    auth.signup(formData, authCallback);
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber1: value });
  };

  const getOptions = (option) => {
    if (option) {
      return option.name;
    }
    return selectedOption || "";
  };

  const handleChange = (event, newVal) => {
    let ind = event.target.id.indexOf("-");
    let key = event.target.id.substring(0, ind);
    console.log(key);
    console.log(newVal);
  };

  const onSelectVendor = () => {
    setUserRole("vendor");
    setShowOption(false);
  };

  const onSelectConnector = () => {
    setUserRole("connector");
    setShowForm(true);
  };

  const onSelectYes = () => {
    setShowForm(true);
  };

  const toSignInComponent = () => {
    return(
    <>
      <p className="mt-2 text-xs font-light text-center text-gray-700">
        {" "}Already have an account?{" "}
        <a href="/" className="font-medium text-purple-600 hover:underline">
          Sign in
        </a>
      </p>
    </>)
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
        <div className="w-9/12 m-auto bg-white rounded-md drop-shadow-2xl">
          <Grid container spacing={2}>
            <Grid item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{ textAlign: "center", backgroundColor: "#4835d4" }}
              className="py-32 rounded-md"
            >
              <Grid container>
                <Grid item xs={12} sx={{ paddingTop: 6 }}>
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
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="flex items-center rounded-md bg-white"
            >
              {showForm ? (
                <>
                  
                  <Grid container spacing={2}>
                    {userRole === "vendor" ? (
                      <>
                        <Grid item xs={6} >
                          <Typography>Organisation*</Typography>
                          <Autocomplete
                            options={organisationList}
                            getOptionLabel={getOptions}
                            id="vendorId"
                            onChange={handleChange}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Organisation"
                                type="text"
                                fullWidth
                                variant="outlined"
                                size="small"
                              />
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={5.8}
                          sx={{
                            padding: 1,
                            boxShadow: 0,
                            backgroundColor: "#F0F0F0",
                            minHeight: 100,
                          }}
                        ></Grid>
                      </>
                    ) : (
                      <></>
                    )}
                    <Grid item xs={6}>
                      <Typography>First Name*</Typography>
                      <TextField
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter your First name here"
                        value={formData.firstName}
                        onChange={(e) => inputHandler(e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Last Name*</Typography>
                      <TextField
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter your First name here"
                        value={formData.firstName}
                        onChange={(e) => inputHandler(e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Phone Number*</Typography>
                      <MuiPhoneNumber
                        defaultCountry={"us"}
                        onChange={(e) => handlePhoneChange(e)}
                        value={formData.phoneNumber1}
                        variant="outlined"
                        fullWidth
                        placeholder="Contact Number"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                      <Typography>Password*</Typography>
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
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Confirm Password*</Typography>
                      <TextField
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Re-type your Password here"
                        value={formData.confirmPassword}
                        onChange={(e) => inputHandler(e)}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <Box className="mt-6">
                      <div className="mt-6">
                        <button
                          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500"
                          onClick={(e) => submitHandler(e)}
                        >
                          Register
                        </button>
                      </div>
                      <p className="mt-2 text-xs font-light text-center text-gray-700">
                        {" "}
                        Already have an account?{" "}
                        <a
                          href="/"
                          className="font-medium text-purple-600 hover:underline"
                        >
                          Sign in
                        </a>
                      </p>
                    </Box>
                    </Grid>
                  </Grid>
                  
                  

                  
                </>
              ) : (
                <>
                  <Grid container>
                    <div className="flex items-center justify-center">
                      <img
                        src="assets/logos/ConnectorNetDiagramDark.png"
                        width={"50%"}
                      />
                    </div>
                    {showOption ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          sx={{ textAlign: "center", marginY: 3 }}
                        >
                          <Typography>
                            Please Select a role to register yourself
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                          <Box>
                            <Button onClick={onSelectVendor}>Vendor</Button>
                            <Button onClick={onSelectConnector}>Connector</Button>
                          </Box>
                          {toSignInComponent()}
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid
                          item
                          xs={12}
                          sx={{ textAlign: "center", marginY: 3 }}
                        >
                          <Typography>
                            Do you agree to be responsible for managing your
                            organisation on our platform ?
                          </Typography>
                          <Box>
                            <Button onClick={onSelectYes} color="success">Yes</Button>
                            <Button color="error">No</Button>
                          </Box>
                          {toSignInComponent()}
                        </Grid>
                      </>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          {showLoader ? (
            <>
              <Grid container>
                <Grid item xs={12} sx={{ textAlign: "center", marginTop: 10 }}>
                  <img src="assets/Loader/Spinner-px.gif" height={"140vh"} />
                  <Typography sx={{ paddingTop: 2 }}>
                    Please wait while we fetch all your registrations
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}
          {showSuccess ? (
            <>
              <div className="bg-green-300 h-32 text-center shadow-xl rounded-lg">
                <p className="pt-10">
                  Reistration Successful !! <br />
                  <Link to="/">
                    <button className="bg-blue-500 mt-1 px-2 rounded-lg">
                      Sign in here
                    </button>
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUp;
