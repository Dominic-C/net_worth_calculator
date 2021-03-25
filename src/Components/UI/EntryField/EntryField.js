import React from "react";
import classes from "./EntryField.module.css";

const entryField = (props) => {
    return <input className={classes.entryField} {...props}/>
}

export default entryField