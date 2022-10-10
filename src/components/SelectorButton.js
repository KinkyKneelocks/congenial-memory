import React from "react";

const SelectorButton = (props) => {


    return (
        <div onClick={props.changeChart} dataname={props.dataname} className={props.isActive ? "selector-button selector-button--active" : "selector-button"}>{props.dataname}</div>
    )
}

export default SelectorButton