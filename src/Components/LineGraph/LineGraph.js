import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0a");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
       
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0,0");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }

  return chartData;
};

function LineGraph({ casesType = "cases",...props}) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.data)
        .then((data) => {
          let chartData = buildChartData(data, "cases");
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
  <h2>World New Cases</h2><br/>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",

                borderColor: "#CC1034",
                borderWidth: 1,
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
