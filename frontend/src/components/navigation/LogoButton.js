import React from 'react';
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import logo from "./logo/logo.png";
import Typography from "@material-ui/core/Typography"
import Box from '@material-ui/core/Box';

export default function LogoButton() {
    const [reloadHome, setReloadHome] = React.useState(false);

    const reload = (match, location) => {
        if (match && reloadHome) {
            window.location.reload();
        } else {
            return null;
        }
    }

    const handleClick = () => {
        setReloadHome(true);
    }


    return (
        <NavLink to='/' style={{ textDecoration: "none" }} isActive={reload}>
            <div>
                <Button onClick={handleClick} disableFocusRipple >
                    <img src={logo} width="40px" alt="" />
                    <Typography> <Box fontSize={30} fontWeight="fontWeightLight" m={2} onClick={handleClick}> MIGR-AI-TION  </Box> </Typography>
                </Button>
            </div>
        </NavLink>
    );
}