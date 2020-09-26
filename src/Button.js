import React from "react";

const Button = props => {
    let classname = "";
    props.buttonType === "small" ? classname="small-button" : classname = "big-button";

    return (
        <a href={props.route} className={classname}>{props.text}</a>
    );
}

export default Button;