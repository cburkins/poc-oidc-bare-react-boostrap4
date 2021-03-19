/* /src/components/auth/silentRenew.jsx */

import React from "react";
import { AuthContextConsumer } from "../providers/authProvider";
export const SilentRenew = () => (
    <AuthContextConsumer>
        {(authContext) => {
            authContext.signinSilentCallback();
            return <span>loading</span>;
        }}
    </AuthContextConsumer>
);
