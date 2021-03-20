/* /src/providers/authProvider.jsx */

import React, { Component } from "react";
import AuthService from "../services/authService";

// 1st and only argument to .createContext() is defaultValue
// defaultValue is *only* used when a component does not have a matching Provider above it in tree
// Docs say perhaps useful of testing components in isolation with wrapping them
//
// This article says it's useful for destructuring the associated methods within the consumer
// More info here: https://kentcdodds.com/blog/how-to-use-react-context-effectively
// Tested, and destructing within the Consumer still works without the defaultValue object
// So could easily delete 1st (only only) argument to .createContext()
const AuthContext = React.createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({}),
});

export const AuthContextConsumer = AuthContext.Consumer;

export class AuthContextProvider extends Component {
    authService;
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }
    render() {
        // "value" prop will passed to all Consumers of this Context
        // In this case, Consumers will be given access to oidc-client.js via authService
        return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
    }
}
