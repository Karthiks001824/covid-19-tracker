import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from "@mui/material"

import InfoBox from './InfoBox'
import Map from './Map'

 //https://disease.sh/v3/covid-19/countries


function App() {
  const [countries, setCountries ] = useState([]);
  const [country,  setCountry] = useState('worldwide');


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(datas => {
        const countries = datas.map(data =>(
          {
            name: data.country,
            value: data.countryInfo.iso2,
          }
        ))

        setCountries(countries);
      })
    }
    getCountriesData()
  }, [])

const onCountryChange = (event) => {
  const countryCode  = event.target.value

  setCountry(countryCode);
}


  return (
    <div className="App">
      <div className = "app__header" >
        <h1>COVID-19 TRACKER</h1>
        <FormControl className= 'app__dropdown'>
          <Select variant = "outlined" onChange = {onCountryChange} value = { country } >

              <MenuItem value= 'worldwide'>Worldwide</MenuItem>
              {/*Loop through countries and show dropdown*/}

              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

          </Select>
        </FormControl>
      </div>

      <div className = 'app__stats' >
        <InfoBox title = "Coronavirus Cases" cases = {123} total = {2000} />
        <InfoBox title = "Recovered" cases = {1234} total = {3000}/>
        <InfoBox title = "Deaths" cases = {12345} total = {4000} />

      </div>


      {/*Table */}
      {/*Graph*/}

      <Map />
      
    </div>
  );
}

export default App;
