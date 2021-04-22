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
import Mapp from "./Components/Map/Mapp";
import Table from "./Components/Table/Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./Components/LineGraph/LineGraph";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const[casesType, setCasesType]=useState("cases")
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
          const sortedData = sortData(response.data);
          setTableData(sortedData);
          setCountries(response.data);
          setMapCountries(response.data);
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

    await axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(data.countryInfo);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
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
          <h1>COVID-19 TRACKER</h1>
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
          <InfoBox
            style={{ backgroundColor: "#fed8b1" }}
            title="active"
            cases={prettyPrintStat(countryInfo.active)}
          />

          <InfoBox
            style={{ backgroundColor: "#ffa500" }}
            title="coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />

          <InfoBox
            style={{ backgroundColor: "#90ee90" }}
            title="Recoveries"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />

          <InfoBox
            style={{ backgroundColor: "#8A0303" }}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
          <InfoBox
            style={{ backgroundColor: "#99DFB2" }}
            title="Tests"
            cases={prettyPrintStat(countryInfo.tests)}
          />
        </div>

        <Mapp countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app_right">
        <CardContent >
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
         
          {/* Graph */}
          <div className="graph">
            <LineGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
