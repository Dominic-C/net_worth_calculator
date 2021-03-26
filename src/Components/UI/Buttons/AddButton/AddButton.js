import React from "react";
import classes from "./AddButton.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const button = (props) => {
    return <button className={classes.addButton} {...props}>+</button>
}

export default button;