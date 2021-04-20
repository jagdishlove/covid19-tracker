import React,{useState, useEffect} from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
import axios from 'axios';

function App() {

  const[countries, setCountries]=useState([]);

  useEffect(()=>{

    axios.get("https://disease.sh/v3/covid-19/countries")
    .then(response=> (console.log(response) setCountries(response)))
    


  },[])



  return (
    <div className="App">
      <div className="app_header">
        <h1>Covid-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide1</MenuItem>
            <MenuItem value="worldwide">Worldwide2</MenuItem>
            <MenuItem value="worldwide">Worldwide3</MenuItem> */}

            {countries.map(country =>(
              <MenuItem value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + selector drop down */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
