import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./authProvider";

export const PrivateRouteOnlyRender = ({ component: Component, ...rest }) => {
    // Get "context" which gives us access to the getUser() function later
    let authContext = useContext(AuthContext);

    return <Route {...rest} render={(props) => (authContext.isAuthenticated() ? rest.render(props) : <Redirect to="/login" />)} />;
};
