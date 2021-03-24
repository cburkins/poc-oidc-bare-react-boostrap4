import React, { useState, useEffect, useContext } from "react";
import ReactJson from "react-json-view";
import { AuthContext } from "../providers/authProvider";

// React Functional Component
export const UserInfo = (props) => {
    // Get "context" which gives us access to the getUser() function later
    let authContext = useContext(AuthContext);
    // Define "state" for this functional component
    let [userInfo, setUserInfo] = useState();

    // Side affect that runs once after initial render
    // Gets user info from OIDC endpoint, which updates React "state", which causes a 2nd render
    // Because I passed array at end, useEffect() only runs when those items are changed (i.e. never except first render)
    useEffect(() => {
        let userInfoPromise = authContext.getUser();
        userInfoPromise.then((returnedUserInfo) => {
            setUserInfo(returnedUserInfo);
        });
    }, [authContext]);

    // React's render
    return (
        <div style={{ margin: "40px" }}>
            <h2>User Info</h2>
            <ReactJson src={userInfo} />
        </div>
    );
};
