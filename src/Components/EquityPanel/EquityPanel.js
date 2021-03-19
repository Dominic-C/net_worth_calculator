// TODO: reference cashPanel
// create handlers in NetWorthCalc
import React from "react";
import EquityEntry from "./EquityEntry/EquityEntry";
import NewEquityEntry from "./NewEquityEntry/NewEquityEntry";

const equityPanel = (props) => {
    //  equityEntries
    let entries = null;
    if (props.equityItems && props.equityItems.length > 0) {
        entries = props.equityItems.map(item => {
            return <EquityEntry equityItem={item} />
        })
    }
    return (<div>
        {entries}
        <NewEquityEntry equityInputChangeHandler={props.inputChangeHandler}
            clicked={props.clicked}
            newEquityItem={props.newEquityItem}
        />
    </div>);
}

export default equityPanel;