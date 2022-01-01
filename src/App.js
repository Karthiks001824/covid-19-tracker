import React, { useState, useEffect } from 'react';
import './App.css';
 import { FormControl, Select, MenuItem } from "@mui/material"

 //https://disease.sh/v3/covid-19/countries


function App() {
  const [countries, setCountries ] = useState([
    'USA', 'UK', 'INDIA'
  ])

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

  return (
    <div className="App">
      <div className = "app__header" >
        <h1>COVID-19 TRACKER</h1>
        <FormControl className= 'app__dropdown'>
          <Select variant = "outlined" value = "abc">
              {/*Loop through countries and show dropdown*/}

              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

              {/*<MenuItem value= 'worldwide'>Worldwide</MenuItem>
              <MenuItem value= 'worldwide'>Option two</MenuItem>
              <MenuItem value= 'worldwide'>Option Three</MenuItem>
              <MenuItem value= 'worldwide'>Option Four</MenuItem>*/}
          </Select>
        </FormControl>
      </div>


      {/*Header => Title + dropdown Field*/}

      {/*Info Boxes*/}
      {/*Info Boxes*/}
      {/*Info Boxes*/}

      {/*Table */}
      {/*Graph*/}

      {/*Map*/}
    </div>
  );
}

export default App;
