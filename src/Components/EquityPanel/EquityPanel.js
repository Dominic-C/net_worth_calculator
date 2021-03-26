import React from "react";
import Panel from "../UI/Panel/Panel";
import Table from "../UI/Table/Table";
import NewEquityEntry from "./NewEquityEntry/NewEquityEntry";
import NewEquitySpinner from "../EquityPanel/NewEquitySpinner/NewEquitySpinner";

const equityPanel = (props) => {

    const headerTitles = ["Ticker", "Quantity", "Price (USD)", "Value (USD)", "Value (SGD)"];
    //  equityEntries
    let entries = null;
    if (props.equityItems && props.equityItems.length > 0) {
        entries = props.equityItems.map((item, index) => {
            // return <EquityEntry equityItem={item} />
            return (
                <tr key={index}>
                    <td>{item.ticker}</td>
                    <td>{item.quantity}</td>
                    <td>{item.stockPrice}</td>
                    <td>{item.totalValue}</td>
                    <td>{(item.totalValue * 1.35).toFixed(2)}</td>
                </tr>
            );
        })
    }
    return (
        <Panel description={props.description}>
            {props.equityItems.length > 0
                ?
                <Table tableHeaders={headerTitles} tableEntries={entries} />
                : null
            }
            {props.fetching ? <NewEquitySpinner /> : null}
            <NewEquityEntry
                equityInputChangeHandler={props.inputChangeHandler}
                clicked={props.clicked}
                newEquityItem={props.newEquityItem}
                suggestions={props.suggestions}
                autofill={props.autofill} />
        </Panel>);
}

export default equityPanel;