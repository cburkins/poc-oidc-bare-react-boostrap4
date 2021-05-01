/* /src/app.jsx */
import React, { Component } from "react";
import { AuthContextProvider } from "./providers/authProvider";
import { AuthContextConsumer } from "./providers/authProvider";
import { BrowserRouter, Link } from "react-router-dom";

import { Route, Switch } from "react-router-dom";

import { Callback } from "./components/authCallback";
import { Logout } from "./components/authLogout";
import { Login } from "./components/authLogin";
import { LogoutCallback } from "./components/authLogoutCallback";
import { Register } from "./components/authRegister";
import { SilentRenew } from "./components/authSilentRenew";

import { PrivateRoute } from "./providers/privateRoute";
import { PrivateRoutePassProps } from "./providers/privateRoutePassProps";
import { PrivateRouteComponentOrRender } from "./providers/PrivateRouteComponentOrRender";
import { PrivateRouteOnlyRender } from "./providers/PrivateRouteOnlyRender";
import { PublicPage } from "./components/publicPage";
import { PrivatePage } from "./components/privatePage";
import { UserInfo } from "./components/UserInfo";
import { HomePage } from "./components/homePage";

import { Nav, Navbar } from "react-bootstrap";

class App extends Component {
    render() {
        return (
            <div>
                <AuthContextProvider>
                    {/* <BrowserRouter children={Routes} basename={"/"} /> */}
                    <AuthContextConsumer>
                        {(authContext) => {
                            // inside context
                            const isAuthenticatedBooleanString = authContext.isAuthenticated() ? "Authenticated" : "Not Authenticated";
                            return (
                                <BrowserRouter basename={"/"}>
                                    <Navbar bg="light">
                                        {/* 1st Nav item with className mr-auto pushes the 2nd Nav item to the right */}
                                        <Nav className="mr-auto">
                                            <Nav.Link as={Link} to="/">
                                                Home
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/publicpage">
                                                PublicPage
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/privatepage01">
                                                PrivatePage01
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/privatepage02">
                                                PrivatePage02
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/privatepage03">
                                                PrivatePage03
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/privatepage04">
                                                PrivatePage04
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/privatepage05">
                                                PrivatePage05
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/userinfo">
                                                UserInfo
                                            </Nav.Link>
                                        </Nav>
                                        {/* 2nd Nav item, gets pushed to right because of mr-auto on first item */}
                                        <Nav>
                                            {/* To match links, seems you have to add a bit of padding */}
                                            <Nav style={{ padding: "8px" }}>Status: {isAuthenticatedBooleanString}</Nav>
                                            <Nav className="ml-3">
                                                {authContext.isAuthenticated() ? (
                                                    <button onClick={() => authContext.logout()}>Log out</button>
                                                ) : (
                                                    <button onClick={() => authContext.signinRedirect()}>Log in</button>
                                                )}
                                            </Nav>
                                        </Nav>
                                    </Navbar>

                                    <Switch>
                                        <Route exact={true} path="/signin-oidc" component={Callback} />
                                        <Route exact={true} path="/logout" component={Logout} />
                                        <Route exact={true} path="/login" component={Login} />
                                        <Route exact={true} path="/logout/callback" component={LogoutCallback} />
                                        <Route exact={true} path="/register" component={Register} />
                                        <Route exact={true} path="/silentrenew" component={SilentRenew} />
                                        <Route exact={true} path="/publicpage" render={() => <PublicPage />} />
                                        {/* This custom_message attribute will get droppped because PrivateRoute doesn't handle it */}
                                        <PrivateRoute path="/privatepage01" component={PrivatePage} custom_message={"PrivatePage01"} />
                                        {/* This custom_message will be honored by PrivateRoutePassProps, though weird way to pass props */}
                                        <PrivateRoutePassProps path="/privatepage02" component={PrivatePage} custom_message={"PrivatePage02"} />
                                        {/* This custom_message will be honored by PrivateRoutePassProps which handles render() with props */}
                                        <PrivateRouteComponentOrRender
                                            path="/privatepage03"
                                            render={() => <PrivatePage custom_message={"PrivatePage03"} />}
                                        />
                                        {/* Prove that PrivateRouteComponentOrRender can handle both render() and component attributes */}
                                        <PrivateRouteComponentOrRender path="/privatepage04" component={PrivatePage} />
                                        <PrivateRouteOnlyRender
                                            path="/privatepage05"
                                            render={() => <PrivatePage custom_message={"PrivatePage05"} />}
                                        />
                                        <PrivateRoute path="/userinfo" component={UserInfo} />
                                        <Route path="/" component={HomePage} />
                                    </Switch>
                                </BrowserRouter>
                            );
                        }}
                    </AuthContextConsumer>
                </AuthContextProvider>
            </div>
        );
    }
}

export default App;
