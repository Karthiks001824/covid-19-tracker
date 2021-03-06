import React from 'react'
import numeral from 'numeral'
import { Circle, Tooltip } from 'react-leaflet'

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 250,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 270,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 1500,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1)) 
}

// sortedData.sort((a,b) => {
//   if (a.cases > b.cases) {
//     return -1
//   } else {
//     return 1;
//   }
// })
// return sortedData;

export const prettyPrintStat = (stat) => {
 return stat ? `+${numeral(stat).format("0.0a")}`: "+0"
}


export const showDataOnMap = (data, casesType= 'cases') => {

  return data.map((country)=> (

    <Circle
      center = {[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity = {0.4}
      pathOptions = {{color: casesTypeColors[casesType].hex,
      fillColor: casesTypeColors[casesType].hex}}
      radius = {
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      } >
        <Tooltip>
        <div className = "info-container">
            <img className = "info-flag" src={`${country.countryInfo.flag}`} alt=""/>
            <div className = "info-name">
              {country.country}
            </div>
            <div className = "info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className = "info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className = "info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
         </div> 
        </Tooltip>
    </Circle>
    
  ))
    
}