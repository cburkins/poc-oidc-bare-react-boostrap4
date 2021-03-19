/* /src/routes/privateRoute.jsx */
import React from "react";
import { Route } from "react-router-dom";
import { AuthContextConsumer } from "../providers/authProvider";

export const PrivateRouteAddManualProp = ({ component, ...rest }) => {
    console.log("start PrivateRoute() component");

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // This is a HOC: Takes a Component as arg, returns a modified Compoment
    const withAuthHOC = function (Component) {
        //
        // Define a React Functional Components (takes props, and returns JSX)
        let FunctionalComponent = function (props) {
            let JSXThatWeReturn = (
                // AuthContextConsumer is equivalent to AuthContext.Consumer
                // This context contains a number of methods defined in providers/authProvider
                // React context requires a function as a child
                //    which receives context as param, a React node
                <AuthContextConsumer>
                    {(authContext) => {
                        if (!!Component && authContext.isAuthenticated()) {
                            return <Component {...props} />;
                        } else {
                            authContext.signinRedirect();
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

    // I think this is a render prop, leveraging a Higher Order Component (HOC)
    // The render prop requires a function that is essentially a React Component
    let ComponentWrappedWithAuth = withAuthHOC(component);
    return <Route {...rest} render={() => <ComponentWrappedWithAuth {...rest} />} />;
};
