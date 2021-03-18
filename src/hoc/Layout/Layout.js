import React from "react";
import Auxiliary from "../Auxiliary/Auxiliary"
import NetWorthCalculator from "../../Containers/NetWorthCalculator/NetWorthCalculator"
const layout = (props) => {
    return (<Auxiliary>
            <div>Savings</div>
            <div>Debt</div>
            <div>Net worth</div>
            <NetWorthCalculator/>
        </Auxiliary>);
}

export default layout;