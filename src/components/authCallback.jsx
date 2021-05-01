/* /src/components/auth/callback.jsx */
import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const AuthCallback = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.signinRedirectCallback();
            return <span>loading (within AuthCallback)</span>;
        }}
    </AuthContextConsumer>
);
