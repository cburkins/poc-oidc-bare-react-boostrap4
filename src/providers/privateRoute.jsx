/* /src/routes/privateRoute.jsx */
import React from "react";
import { Route } from "react-router-dom";
import { AuthContextConsumer } from "../providers/authProvider";

export const PrivateRoute = ({ component, ...rest }) => {
    console.log("start PrivateRoute() component");

    // const renderFn = (Component) => (props) => (
    //     <AuthContextConsumer>
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
    //     </AuthContextConsumer>
    // );

    // const renderFn = (Component) => (props) => {
    //     return (
    //         <AuthContextConsumer>
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
    //         </AuthContextConsumer>
    //     );
    // };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // This is a HOC: Takes a Component as arg, returns a modified Compoment
    const withAuthHOC = function (Component) {
        //
        // A function that takes props, and returns JSX ?
        let FunctionalComponent = function (props) {
            let JSXThatWeReturn = (
                <AuthContextConsumer>
                    {({ isAuthenticated, signinRedirect }) => {
                        if (!!Component && isAuthenticated()) {
                            return <Component {...props} />;
                        } else {
                            signinRedirect();
                            return <span>loading</span>;
                        }
                    }}
                </AuthContextConsumer>
            );
            return JSXThatWeReturn;
        };
        //
        return FunctionalComponent;
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // let chad = withAuthHOC(<component name="Hi Chad" />);
    let NewComponent = withAuthHOC(component);

    // I think this is a render prop, leveraging a Higher Order Component (HOC)
    // The render prop requires a function that is essentially a React Component
    return <Route {...rest} render={() => <NewComponent name="Hi Chad" />} />;
};
