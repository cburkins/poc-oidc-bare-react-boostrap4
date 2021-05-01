/* /src/components/auth/login.jsx */

import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const AuthLogin = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.signinRedirect();
            return <span>loading (within AuthLogin)</span>;
        }}
    </AuthContextConsumer>
);
