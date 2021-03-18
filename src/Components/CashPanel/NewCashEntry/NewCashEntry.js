import React from "react";
// import Auxiliary from "../../../hoc/Auxiliary";

// receive two input fields
// add button adds to state
const newCashEntry = (props) => {
    return (<div>
        <input placeholder="Cash Item name" name="name" onChange={props.inputChanged} value={props.newCashItem.name}></input>
        <input placeholder="Value" name="value" onChange={props.inputChanged}  value={props.newCashItem.value}></input>
        <button onClick={props.clicked}>Add</button>
    </div>);
}

export default newCashEntry;