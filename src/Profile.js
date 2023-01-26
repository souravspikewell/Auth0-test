import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "./services/auth0.service";

function Profile() {
    const location = useLocation()

    const processHash = (hash) => {
        auth.parseHash({
            hash
        },function authCallback(error,result){
            console.log("error",error,"result",result)
            if(error){
                console.log("verification Unsuccessful")
                console.log(error)
              }
              else{
                  const accessToken = result;
                  if(accessToken){
                      auth.client.userInfo(accessToken,function tokenCallback(error,result){
                        console.log(error,result)
                        if(error){
                            console.log("invalid user");
                        }
                        if(result){
                            console.log("User id fetched successfully")
                            console.log(result)
                        }
                      })
                  }
              }
        });
    }

    useEffect(() => {
        if(location.hash){
            var modToken = location.hash
            processHash(modToken)
        }
    },[location])

    return (
      <>
          <h1>SUCCESSFULLY LOGGED IN</h1>
  
      </>
    );
  }
  
  export default Profile;
  