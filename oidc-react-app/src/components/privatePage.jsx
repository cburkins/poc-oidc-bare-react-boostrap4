import React from "react";

export const PrivatePage = (props) => {
    return (
        <div>
            <div>Silly title</div>
            <div>Custom content = {props.name}</div>
            <div>Private page</div>
        </div>
    );
};
