/* /src/components/auth/logout.jsx */

import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";

export const Logout = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.logout();
            return <span>loading</span>;
        }}
    </AuthContextConsumer>
);
