import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@mui/material"
import "leaflet/dist/leaflet.css";

import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData, prettyPrintStat } from './util.js'

 //https://disease.sh/v3/covid-19/countries


function App() {
  const [countries, setCountries ] = useState([]);
  const [country,  setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo ] = useState({});
  const [tableData, setTabledata ] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796});//[34.80746, -40.4796]
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases')

  useEffect(()=> {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, [])

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
        const sortedData = sortData(datas)
        setTabledata(sortedData);
        setMapCountries(datas);
        setCountries(countries);
        
      })
    }
    getCountriesData()
  }, [])


const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };


  return (
    <div className="app">
      <div className = "app__left" >
        <div className = "app__header" >
          <h1>COVID-19 TRACKER</h1>
          <FormControl className= 'app__dropdown'>
            <Select className= 'scroll' variant = "outlined" onChange = {onCountryChange} value = { country } >
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
          <InfoBox
            isRed
            active = {casesType === 'cases'}
            onClick = {(e) => setCasesType('cases')} 
            title = "Coronavirus Cases" 
            cases = {prettyPrintStat(countryInfo.todayCases)} 
            total = {prettyPrintStat(countryInfo.cases)} />
          <InfoBox 
            active = {casesType === 'recovered'}
            onClick = {(e) => setCasesType('recovered')} 
            title = "Recovered" 
            cases = {prettyPrintStat(countryInfo.todayRecovered)} 
            total = {prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox
            isRed 
            active = {casesType === 'deaths'}
            onClick = {(e) => setCasesType('deaths')} 
            title = "Deaths" 
            cases = {prettyPrintStat(countryInfo.todayDeaths)} 
            total = {prettyPrintStat(countryInfo.deaths)} />
        </div>

        <Map
          casesType = {casesType}
          countries = {mapCountries}
          center={mapCenter}
          zoom={mapZoom}
         />
      </div>
      <Card className ="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
            <Table countries = {tableData} />
          <h3 className = "app__graphtitle">Worldwide new {casesType}</h3>
          <LineGraph className = "app__graph" casesType = {casesType}/>
          {/*Graph*/}
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
