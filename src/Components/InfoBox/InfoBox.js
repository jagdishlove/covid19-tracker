import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";
function InfoBox({ title, cases, total }) {
  return (
    <Card className="infobox">
      <CardContent>
        {/* Title */}
        <Typography className="infobox_title" color="textSecondary">{title}</Typography>
        
        {/* No. of Cases */}
        <h2 className="infobox_cases">{cases}</h2>
        {/* Total cases */}
        <Typography className="infobox_total" color="textSecondary">
            {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
