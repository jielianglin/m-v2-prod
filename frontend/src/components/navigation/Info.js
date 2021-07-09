import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(10),
    color: "blue",
  },
}));

export default function Info() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography className={classes.typography}>
        <h1>
          {" "}
          <i>migr</i>-AI-<i>tion</i>
        </h1>
        <h3> {">>"} A ‘Clear-Box’ AI Platform for Migrants </h3>
        <h3>
          Our platform is an integrated tool for art, healing and political
          action! We are re-designing AI production into creative, therapeutic
          and collaborative processes for migrants. We aim to bring more public
          awareness to exploitative and extractive practices, and issues such as
          surveillance, invisible labor and data colonialism that affect
          migrants disproportionately. Our dream is to collaborate on a new
          story of migration and solidarity, synthethizing opportunities for
          transnationals to be representated in the future media landscape.{" "}
        </h3>
        <br />
        <h4>CONTACT: info@migr-ai-tion.net</h4>
        <h6>Facebook | Instagram | Twitter</h6>
      </Typography>
    </div>
  );
}
