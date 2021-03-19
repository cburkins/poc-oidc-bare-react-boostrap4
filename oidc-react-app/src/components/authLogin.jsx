/* /src/components/auth/login.jsx */

import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const Login = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.signinRedirect();
            return <span>loading</span>;
        }}
    </AuthContextConsumer>
);
