/* /src/components/auth/logout.jsx */

import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const AuthLogout = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.logout();
            return <span>loading (within AuthLogout)</span>;
        }}
    </AuthContextConsumer>
);
