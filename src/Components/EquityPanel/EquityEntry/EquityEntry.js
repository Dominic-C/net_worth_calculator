import React from "react";
// display one equity entry item
const equityEntry = (props) => {
    return (<div >
        <p>{props.equityItem.ticker}</p>
        <p>{props.equityItem.quantity}</p>
        <p>{props.equityItem.stockPrice}</p>
        <p>{props.equityItem.totalValue}</p>
    </div>);
} 

export default equityEntry;