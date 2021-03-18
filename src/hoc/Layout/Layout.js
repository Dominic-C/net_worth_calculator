import React from "react";
import Auxiliary from "../Auxiliary/Auxiliary"
import NetWorthCalculator from "../../Containers/NetWorthCalculator/NetWorthCalculator"
const layout = (props) => {
    return (<Auxiliary>
            <NetWorthCalculator/>
        </Auxiliary>);
}

export default layout;