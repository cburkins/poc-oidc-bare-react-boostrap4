/* /src/app.jsx */
import React, { Component } from "react";
import { AuthContextProvider } from "./providers/authProvider";
import { BrowserRouter, Link } from "react-router-dom";

import { Route, Switch } from "react-router-dom";

import { Callback } from "./components/authCallback";
import { Logout } from "./components/authLogout";
import { Login } from "./components/authLogin";
import { LogoutCallback } from "./components/authLogoutCallback";
import { Register } from "./components/authRegister";
import { SilentRenew } from "./components/authSilentRenew";

import { PrivateRoute } from "./providers/privateRoute";
import { PrivateRouteAddManualProp } from "./providers/privateRouteAddManualProp";
import { PublicPage } from "./components/publicPage";
import { PrivatePage } from "./components/privatePage";

import { Nav, Navbar } from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div>
                <AuthContextProvider>
                    {/* <BrowserRouter children={Routes} basename={"/"} /> */}
                    <BrowserRouter>
                        <Navbar bg="light">
                            <Nav>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    Logout
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/privatepage01">
                                    PrivatePage01
                                </Nav.Link>
                                <Nav.Link as={Link} to="/privatepage02">
                                    PrivatePage02
                                </Nav.Link>
                            </Nav>
                        </Navbar>

                        <Switch>
                            <Route exact={true} path="/signin-oidc" component={Callback} />
                            <Route exact={true} path="/logout" component={Logout} />
                            <Route exact={true} path="/login" component={Login} />
                            <Route exact={true} path="/logout/callback" component={LogoutCallback} />
                            <Route exact={true} path="/register" component={Register} />
                            <Route exact={true} path="/silentrenew" component={SilentRenew} />
                            <PrivateRoute path="/privatepage01" component={PrivatePage} />
                            <PrivateRouteAddManualProp path="/privatepage02" component={PrivatePage} custom_message={"Hi Pebbles"} />
                            <Route path="/" component={PublicPage} />
                        </Switch>
                    </BrowserRouter>
                </AuthContextProvider>
            </div>
        );
    }
}

export default App;
