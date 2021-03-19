import React from "react";

const overviewPanel = (props) => {
    return (<div>
        <p>Total Cash Value: {props.cashValue}</p>
        <p>Total Equity Value: {props.equityValue}</p>
        <p>Total Net Worth: {props.totalValue}</p>
    </div>)
}

export default overviewPanel;