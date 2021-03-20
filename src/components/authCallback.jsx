/* /src/components/auth/callback.jsx */
import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const Callback = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.signinRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthContextConsumer>
);
