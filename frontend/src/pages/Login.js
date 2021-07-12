import React from 'react';
import TextField from '@material-ui/core/Textfield';

export default function Login() {
    return (
        <div style={{ padding: "50px", display: "flex", justifyContent: "center" }}>
            <TextField
                variant="outlined"
                helperText="Please enter your name"
                id="demo-helper-text-misaligned"
                label="Name"
                margin="normal"
            />
            <br />
            <TextField
                variant="outlined"
                helperText="Please enter your email address"
                id="demo-helper-text-misaligned"
                label="Email"
                margin="normal"
            />

            <br />
            <TextField
                variant="outlined"
                helperText="Please create your password"
                id="demo-helper-text-misaligned"
                label="Password"
                margin="normal"
            />
            <br />

            <TextField
                variant="outlined"
                helperText="Please re-type your password"
                id="demo-helper-text-misaligned"
                label="Re-type Password"
                margin="normal"
            />
        </div>
    );
}