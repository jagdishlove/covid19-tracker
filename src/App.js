import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
import axios from "axios";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await axios.get("https://disease.sh/v3/covid-19/countries")
        .then(response=>{console.log(response.data);
          setCountries(response.data)
        })
        // .then((data) => {
        //   const countries = data.map((country) => ({
        //     name: country.country,
        //     value: country.countryInfo.iso2,
        //   }));

          
        // };
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app_header">
        <h1>Covid-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>

            {countries.map((country) => (
              <MenuItem value={country.countryInfo.iso2}>{country.country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


      <div className="app_stats">

      {/* InfoBoxes title="Corona cases*/}
      {/* InfoBoxes title="Corona recovery" */}
      {/* InfoBoxes title="Corona death" */}

      </div>
     
      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
};

export default App;
