import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css'

import { countries, fetchCountries } from '../../api';

const CountryPicker = ( { handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries()); //calling the api from our import
        }

        fetchAPI(); //starting the function to actually call it
    }, [setFetchedCountries]); //this make our state change only when setFetchedCountries change

    //console.log(fetchedCountries);
    return (
        <FormControl className = {styles.formControl}>
            <NativeSelect defaultValue = "" onChange = {(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                { fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}



export default CountryPicker;