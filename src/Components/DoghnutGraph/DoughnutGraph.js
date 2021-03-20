import React from "react";
import {Doughnut} from 'react-chartjs-2';
import classes from "./DoughnutGraph.module.css";

// takes in labels and data as props
// [{name, value}]
const doughnutGraph = (props) => {
        const labels = props.datalist.map(item => item.name);
        const values = props.datalist.map(item => item.value);
        const data = {
            labels: labels,
            datasets: [
                {
                    label: props.title,
                    backgroundColor: [
                        '#9580ff',
                        '#d580ff',
                        '#ff80ea',
                        '#ff80ab',
                        '#ff9580'
                      ],
                      hoverBackgroundColor: [
                      '#785dff',
                      '#c95dff',
                      '#ff5de4',
                      '#ff5d93',
                      '#ff785d'
                      ],
                    data: values
                }
            ]
        }
        return (<div className={classes.DoughnutContainer}>
                    <Doughnut
                            data={data}
                            width={300}
                            height={300}
                            options={{
                                title:{
                                display:true,
                                text:props.title,
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                },
                                maintainAspectRatio: false
                            }}
                            />
                    <p>{props.description}: ${props.displayVal}</p>
        </div>);
}

export default doughnutGraph;