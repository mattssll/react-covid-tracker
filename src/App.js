import React from 'react';

//import Cards from './componenets/Cards/Cards';
//import Chart from './componenets/Cards/Chart';
//import CountryPicker from './componenets/Cards/CountryPicker';

import { Cards, Chart, CountryPicker} from './components'; //index.js file let this work (inside components)
import styles from './App.module.css';
import { fetchData } from './api'; //same as importing ./api/index.js

import coronaImage from './images/image.png'

class App extends React.Component {
    state = {
        data: {}, //we start the state with an empty js object
        country: '',
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        //console.log(data);
        this.setState({ data: fetchedData }); //then we set a value to it, which trigger rendering
        //with the above done we can send this data as props to our components below (Cards)
        //other option would be: <Cards data= {this.state.data} />, but we destructured it below
    }

    handleCountryChange = async (country) => { //send this as a prop to countrypicker
        const fetchedData = await fetchData(country);
        //console.log(fetchedData); this would show our data when we change the country in the picker
        //fetch the data (above)
        this.setState( {data: fetchedData, country: country }); //the 2nd country here is being fetched from our country in async (country)
        //set the state
    }

    render() {
        const { data, country } = this.state;
        return (
            <div className = {styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data= {data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}


export default App;