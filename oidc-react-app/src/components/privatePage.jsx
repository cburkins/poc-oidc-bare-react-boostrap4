import React from "react";

export const PrivatePage = (props) => {
    return (
        <div style={{ margin: "40px" }}>
            <div>Private page</div>
            <div>Custom message = {props.custom_message}</div>
        </div>
    );
};

PrivatePage.defaultProps = {
    custom_message: "No custom message provided via props",
};
