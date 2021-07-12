import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default function UserLoginIcon() {

    return (
        <Link to="/login">
            <Button>
                <PersonIcon />
            </Button>
        </Link>
    )

}