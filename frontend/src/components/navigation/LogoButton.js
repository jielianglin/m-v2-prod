import React from 'react';
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import logo from "./logo/logo.png";

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
        <NavLink to='/' isActive={reload}>
            <Button onClick={handleClick}>
                <img src={logo} width="50px" alt="" />
            </Button>
        </NavLink>
    );
}