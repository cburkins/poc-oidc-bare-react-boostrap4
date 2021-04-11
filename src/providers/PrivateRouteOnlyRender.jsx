import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./authProvider";

export const PrivateRouteOnlyRender = ({ render: orig_render, ...rest }) => {
    //
    // Get "context" which gives us access to the getUser() function later
    let authContext = useContext(AuthContext);

    return (
        <Route
            // Pass through rest of props originally used
            {...rest}
            // And the render function
            render={(props) =>
                // If user is authenticaed, render desired function
                authContext.isAuthenticated() ? orig_render(props) : <Redirect to="/login" />
            }
        />
    );
};
