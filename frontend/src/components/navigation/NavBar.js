import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import LogoButton from './LogoButton.js';
import UserLoginIcon from './UserLoginIcon';
import MenuListComposition from "./MenuListComposition";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuIcon: {},
  title: {
    flexGrow: 1
  },

}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" elevation={0} style={{ backgroundColor: "#E6DAC8" }}>
          <Toolbar>
            <div styles={{ position: "relative", top: "3px", width: "40px", height: "auto" }}>
              <LogoButton />
            </div>
            <Typography variant="h6" className={classes.title}></Typography>
            <UserLoginIcon />
            <MenuListComposition />
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
