/* /src/routes/privateRoute.jsx */
import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../providers/authProvider";

export const PrivateRoute = ({ component, ...rest }) => {
    console.log("start PrivateRoute() component");

    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                console.log("PrivateRoute(): about to check if authenticated");
                console.log("PrivateRoute(): isAuthenticated=", isAuthenticated());
                console.log("PrivateRoute():");
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <span>loading</span>;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};
