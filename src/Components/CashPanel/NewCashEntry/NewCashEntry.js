import React from "react";
import EntryField from "../../UI/EntryField/EntryField";
import AddButton from "../../UI/Buttons/AddButton/AddButton"
// receive two input fields
// add button adds to state
const newCashEntry = (props) => {
    return (<div>
        <EntryField autoComplete="off" placeholder="Cash Item name" name="name" onChange={props.inputChanged} value={props.newCashItem.name}/>
        <EntryField autoComplete="off" placeholder="Value" name="value" onChange={props.inputChanged}  value={props.newCashItem.value} type="number"/>
        <AddButton onClick={props.clicked}/>
    </div>);
}

export default newCashEntry;