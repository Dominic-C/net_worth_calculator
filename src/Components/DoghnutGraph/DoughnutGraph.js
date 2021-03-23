import React from "react";
import {Doughnut, defaults} from 'react-chartjs-2';
import classes from "./DoughnutGraph.module.css";

// takes in labels and data as props
const doughnutGraph = (props) => {
        defaults.global.defaultFontFamily = 'Poppins'; // override chartjs font family
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
                    <h2>{props.title}</h2>
                    <Doughnut
                            data={data}
                            width={300}
                            height={300}
                            options={{
                                // title:{
                                // display:true,
                                // text:props.title,
                                // fontSize:20,
                                // fontColor: 'black'
                                // },
                                legend:{
                                display:true,
                                position:'bottom'
                                },
                                maintainAspectRatio: true
                            }}
                            />
                    <p>{props.description}: ${props.displayVal}</p>
        </div>);
}

export default doughnutGraph;