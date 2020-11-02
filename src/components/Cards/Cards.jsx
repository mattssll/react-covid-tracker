import React from 'react';
import { Card, CardContent, Typography, Grid, StylesProvider} from '@material-ui/core'
import CountUp from 'react-countup';
import cx from 'classnames'; //comes from react i guess
import styles from './Cards.module.css';


// const Cards = (props) => { this way we'd get full data object, but we'll deconstruct it
const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}}) => { //destructing 2 times, from data, and from conf,recov,deat, etc
    // we could access the data with confirmed.value (in the jsx below) { confirmed.value }
    //since in App.js the props is: <Cards data= {data} /> only data, then we have to do the above data : {conf...etc}
    if(!confirmed){ //we need this iff since the first state of the data is an empty js obj ({})
        return 'Loading ...'
    }
    //console.log(props); the props would print the data coming from the Apps implementation of props
    return (
        <div className = {styles.container}>
            
            <Grid container spacing = {3} justify = "center">
                
                <Grid item component= {Card} xs={12} md={3} className={ cx(styles.card, styles.infected) }>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Number of confirmed cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component= {Card} xs={12} md={3} className={ cx(styles.card, styles.recovered) }>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Number of recovered cases from COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component= {Card} xs={12} md={3} className={ cx(styles.card, styles.deaths) }>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{ new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>



            </Grid>
        </div>
    )
}



export default Cards;