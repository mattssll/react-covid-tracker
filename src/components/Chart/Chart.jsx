import React, {useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'


const Chart = ( {data : {confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]); //empty array since dailyData is an array

    useEffect(() => { //use affect is being used with a callback function inside (fetchAPI)
        const fetchAPI = async () => {
            setDailyData (await fetchDailyData()); //fetchDailyData comes from our api
        }

        //console.log(dailyData);

        fetchAPI();
    }, []); //empty array here makes use effect work like ComponenDidMount (starting empty), only happens once


    const lineChart = (
        dailyData.length != 0
        ? (
        //using ternary operator like an if
        <Line 
        data = {{
            labels: dailyData.map(( { date }) => date), //dest date and return date -- map that returns array of all dates
            datasets: [{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
            }, {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Infected',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
            }],
        }}
        />) : null
    );


    const barChart = (
        confirmed
        ? (
            <Bar 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                ],
                data: [confirmed.value, recovered.value, deaths.value] //coming from props
                }]
            }}
            options={{
                legend: {display: false },
                title: {display: true, text: `Current state in ${country}`},
             }}
              />
        ) : null
    );



    //if there's a country returns bar, if not returns line chart
    return (
        <div className = { styles.container }>
            { country ? barChart : lineChart }
        </div>
    )
}



export default Chart;