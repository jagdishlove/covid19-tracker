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
import Table from "./Components/Table/Table";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => setCountryInfo(response.data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
          setTableData(response.data);
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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await axios.get(url).then((response) => {
      console.log(response.data);
      setCountryInfo(response.data);
      setCountry(countryCode);
    });
    // .then((data) => {
    //   setCountry(countryCode);
    //All of the data....
    //from the country response.

    // });
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
          <InfoBox title="Tests" cases={countryInfo.tests} />

          <InfoBox title="active" cases={countryInfo.active} />

          <InfoBox
            title="coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          <InfoBox
            title="Recoveries"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
