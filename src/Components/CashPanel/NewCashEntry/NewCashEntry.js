import React from "react";
import EntryField from "../../UI/EntryField/EntryField";
// receive two input fields
// add button adds to state
const newCashEntry = (props) => {
    return (<div>
        <EntryField autoComplete="off" placeholder="Cash Item name" name="name" onChange={props.inputChanged} value={props.newCashItem.name}/>
        <EntryField autoComplete="off" placeholder="Value" name="value" onChange={props.inputChanged}  value={props.newCashItem.value} type="number"/>
        <button onClick={props.clicked}>Add</button>
    </div>);
}

export default newCashEntry;