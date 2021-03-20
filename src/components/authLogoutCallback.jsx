/* /src/components/auth/logoutCallback.jsx */

import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const LogoutCallback = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.signoutRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthContextConsumer>
);
