import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./Components/InfoBox/InfoBox";
import axios from "axios";
import Map from "./Components/Map/Map";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
          console.log(response.data);
          setCountries(response.data);
        });
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
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.countryInfo.iso2}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="coronavirus cases" cases={123} total={2000} />

          <InfoBox title="Recoveries" cases={1234} total={3000} />

          <InfoBox title="Deaths" cases={12345} total={4000} />
        </div>

        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}

          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
