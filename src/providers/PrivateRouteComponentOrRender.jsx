import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./authProvider";

export const PrivateRouteComponentOrRender = ({ component: Component, ...rest }) => {
    // Get "context" which gives us access to the getUser() function later
    let authContext = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => (authContext.isAuthenticated() ? Component ? <Component {...props} /> : rest.render(props) : <Redirect to="/login" />)}
        />
    );
};
