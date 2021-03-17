/* /src/app.jsx */
import React, { Component } from "react";
import { AuthProvider } from "./providers/authProvider";
import { BrowserRouter, Link } from "react-router-dom";

import { Route, Switch } from "react-router-dom";

import { Callback } from "./components/auth/callback";
import { Logout } from "./components/auth/logout";
import { Login } from "./components/auth/login";
import { LogoutCallback } from "./components/auth/logoutCallback";
import { PrivateRoute } from "./providers/privateRoute";
import { Register } from "./components/auth/register";
import { SilentRenew } from "./components/auth/silentRenew";
import { PublicPage } from "./components/publicPage";
import { PrivatePage } from "./components/privatePage";

class App extends Component {
    render() {
        return (
            <div>
                <AuthProvider>
                    {/* <BrowserRouter children={Routes} basename={"/"} /> */}
                    <BrowserRouter>
                        <Link to="/">Home</Link>

                        <Link to="/logout">Logout</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/dashboard">Dashboard</Link>

                        <Switch>
                            <Route exact={true} path="/signin-oidc" component={Callback} />
                            <Route exact={true} path="/logout" component={Logout} />
                            <Route exact={true} path="/login" component={Login} />
                            <Route exact={true} path="/logout/callback" component={LogoutCallback} />
                            <Route exact={true} path="/register" component={Register} />
                            <Route exact={true} path="/silentrenew" component={SilentRenew} />
                            <PrivateRoute path="/dashboard" component={PrivatePage} />
                            <Route path="/" component={PublicPage} />
                        </Switch>
                    </BrowserRouter>
                </AuthProvider>
            </div>
        );
    }
}

export default App;
