import React from 'react';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import logo from "./logo/logo.png";

export default function LogoButton () {

    const handleClick = () => {
        window.location.reload(); 
    }

    return (
    <Link to='/'>
        <Button onClick={handleClick}>
        <img src={logo} width="50px" alt="" />
        </Button>
    </Link>
    );
}  
