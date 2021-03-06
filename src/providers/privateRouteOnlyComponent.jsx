import React from "react";
import { Route } from "react-router-dom";
import { AuthContextConsumer } from "./authProvider";

export const PrivateRouteOnlyComponent = ({ component: orig_component, render: orig_render, ...rest }) => {
    //
    // renderFn takes a Component
    const renderFn = (Component) => (props) => (
        <AuthContextConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    // returning JSX is equivalent to react.createElement, which is returning UI
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <span>loading</span>;
                }
            }}
        </AuthContextConsumer>
    );

    return <Route {...rest} render={renderFn(orig_component)} />;
};
