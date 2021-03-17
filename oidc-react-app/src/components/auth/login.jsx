/* /src/components/auth/login.jsx */

import React from "react";
import { AuthConsumer } from "../../providers/authProvider";

export const Login = () => (
    <AuthConsumer>
        {({ signinRedirect }) => {
            signinRedirect();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);
