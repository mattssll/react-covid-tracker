import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export  const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) { //when no country, it won't use this api - good for global!!
        changeableUrl = `${url}/countries/${country}`
    }


    try {
        //const response = await axios.get(url); //destructuring data from response
        const { data } = await axios.get(changeableUrl); //destructuring data from response
        //a)const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(url); //destructuring data from response
        //b)returnm {confirmed, recovered, deaths, lastupdate};
        //we'll use middle ground here to be more readable than a and b together.
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`); //${url} -- this is a template string
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        })); //return an object for each one of this that we're mapping
        return modifiedData

    } catch (error) {

    }
}


export const fetchCountries = async () => {
    try {
      const { data: { countries }} = await axios.get(`${url}/countries`);

      return countries.map((country) => country.name);
      //console.log(response);
    } catch (error) {
        console.log(error);
    }
}