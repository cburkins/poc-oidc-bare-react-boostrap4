/* /src/routes/privateRoute.jsx */
import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../providers/authProvider";

export const PrivateRoute = ({ component, ...rest }) => {
    console.log("start PrivateRoute() component");

    // const renderFn = (Component) => (props) => (
    //     <AuthConsumer>
    //         {({ isAuthenticated, signinRedirect }) => {
    //             console.log("PrivateRoute(): about to check if authenticated");
    //             console.log("PrivateRoute(): isAuthenticated=", isAuthenticated());
    //             console.log("PrivateRoute():");
    //             if (!!Component && isAuthenticated()) {
    //                 return <Component {...props} />;
    //             } else {
    //                 signinRedirect();
    //                 return <span>loading</span>;
    //             }
    //         }}
    //     </AuthConsumer>
    // );

    // const renderFn = (Component) => (props) => {
    //     return (
    //         <AuthConsumer>
    //             {({ isAuthenticated, signinRedirect }) => {
    //                 console.log("PrivateRoute(): about to check if authenticated");
    //                 console.log("PrivateRoute(): isAuthenticated=", isAuthenticated());
    //                 console.log("PrivateRoute():");
    //                 if (!!Component && isAuthenticated()) {
    //                     return <Component {...props} />;
    //                 } else {
    //                     signinRedirect();
    //                     return <span>loading</span>;
    //                 }
    //             }}
    //         </AuthConsumer>
    //     );
    // };

    const renderFn = (Component) =>
        function (props) {
            return (
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
        };

    let chad = renderFn(component);

    // I think this is a render prop, leveraging a Higher Order Component (HOC)
    // The render prop requires a function that is essentially a React Component
    return <Route {...rest} render={chad} />;
};
