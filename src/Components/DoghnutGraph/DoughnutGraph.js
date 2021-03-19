import React from "react";
import {Doughnut} from 'react-chartjs-2';

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
                        '#B21F00',
                        '#C9DE00',
                        '#2FDE00',
                        '#00A6B4',
                        '#6800B4'
                      ],
                      hoverBackgroundColor: [
                      '#501800',
                      '#4B5000',
                      '#175000',
                      '#003350',
                      '#35014F'
                      ],
                    data: values
                }
            ]
        }
        return (<div>
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
        </div>);
}

export default doughnutGraph;