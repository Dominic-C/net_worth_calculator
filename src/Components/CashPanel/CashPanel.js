import React from "react";
import Panel from "../UI/Panel/Panel";
import Table from "../UI/Table/Table";
import NewCashEntry from "./NewCashEntry/NewCashEntry";

const cashPanel = (props) => {

    // derive table contents
    const headerTitles = ["Item", "Value (SGD)"];
    let entries = null;
    if (props.cashItems && props.cashItems.length > 0) {
        entries = props.cashItems.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                </tr>
            );
        })
    }


    return (
        <Panel description={props.description}>
            {props.cashItems.length > 0 ?
                <Table tableHeaders={headerTitles} tableEntries={entries} />
                :
                null
            }
            <NewCashEntry
                inputChanged={props.inputChanged}
                clicked={props.addCashEntryHandler}
                newCashItem={props.newCashItem} />
        </Panel>);
}

export default cashPanel;