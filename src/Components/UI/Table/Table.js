import React from "react";
import classes from "./Table.module.css";

const table = (props) => {
    return (<table className={classes.table}>
        <thead>
            <tr>
                {props.tableHeaders.map((header, ind) => {
                    return <td key={ind}>{header}</td>
                })}
            </tr>
        </thead>

        <tbody>
            {props.tableEntries}
        </tbody>
    </table>)
}

export default table;
