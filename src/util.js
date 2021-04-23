import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    half_op: "rgba(204,16,52,0.5)",
    multipler: 200,
  },
  recovered: {
    hex: "#7dd71d",
    half_op: "rgba(125,215,29,0.5)",
    multipler: 700,
  },
  deaths: {
    hex: "#fb4443",
    half_op: "rgba(251,68,67,0.5)",
    multipler: 1000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};

export const prettyPrintStat=(stat)=>
stat ?`+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintStats=(stat)=>
stat ?`${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on the map withintractive tooltips
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multipler
      }
    >
      <Popup>
        <div className="info-container">
          <div className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div class="info-name"><strong>{country.country}</strong></div>
          <div class="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
          <div class="info-death">Death: {numeral(country.deaths).format("0,0")}</div>
          <div class="info-recovered ">Recovered: {numeral(country.recovered).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));
