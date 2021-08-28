import React, { useEffect } from 'react';
import axios from "axios";

import TextField from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Landing from './home/Landing';

export default function Login() {

    const [account, createAccount] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [returnedUsername, setReturnedUsername] = React.useState("");

    const [form, setForm] = React.useState(
        {
            username: "",
            email: "",
            password: "",
            repassword: ""
        }
    );

    const [loginForm, setLoginForm] = React.useState(
        {
            username: "",
            password: "",
            repassword: ""
        }
    );

    const [login, setLogin] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(true);


    const handleUserName = (event) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRePassword = (event) => {
        setRePassword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        setForm({
            username: username,
            email: email,
            password: password,
            repassword: rePassword
        })
    }


    useEffect(() => {
        let formData = new FormData();
        formData.append("newUser", form);
        axios.post("http://localhost:8000/user", formData)
            .then(response => {
                createAccount(true);
                setReturnedUsername(response.data.username)
            })
            .catch(error => {
                console.log(error);
            });

    }, [handleSubmit]);

    const handleLogin = (event) => {
        event.preventDefault();
        setLogin(true);
        setLoginForm({
            username: username,
            password: password,
            repassword: rePassword
        })
    }

    useEffect(() => {
        let formData = new FormData();
        formData.append("userLogin", loginForm);
        axios.post("http://localhost:8000/user", formData)
            .then(response => {
                setLoggedIn(true);
            })
            .catch(error => {
                console.log(error);
            });

    }, [handleLogin]);

    if (account) {
        return (
            <div>
                <br />
                <Typography variant="h3" > Hi {returnedUsername}! Your account has been created.</Typography>
            </div>
        )
    }

    else {
        return (
            <div>
                {login ?
                    <div>
                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Username"
                                margin="normal"
                                onChange={handleUserName}
                            />
                        </div>
                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Password"
                                margin="normal"
                                onChange={handlePassword}
                            />
                        </div>

                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Re-type Password"
                                margin="normal"
                                onChange={handleRePassword}
                            />
                        </div>
                        <Button onClick={handleLogin}>
                            <Typography variant="h5"> Login</Typography>
                        </Button>

                        {/* is this nested properly? */}

                        {loggedIn ? <Landing /> : <Typography variant="h5">Incorrect login</Typography>}

                    </div>

                    :

                    <div style={{ padding: "50px", display: "block" }}>
                        <br />
                        <br />
                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Username"
                                margin="normal"
                                onChange={handleUserName}
                            />
                        </div>

                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Email"
                                margin="normal"
                                onChange={handleEmail}
                            />
                        </div>

                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Password"
                                margin="normal"
                                onChange={handlePassword}
                            />
                        </div>

                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <TextField
                                variant="outlined"
                                id="demo-helper-text-misaligned"
                                label="Re-type Password"
                                margin="normal"
                                onChange={handleRePassword}
                            />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button onClick={handleSubmit}>
                                <Typography variant="h7"> Create Account </Typography>
                            </Button>
                        </div>
                        <div style={{
                            padding: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button onClick={handleLogin}>
                                <Typography variant="h7"> Login to  Account</Typography>
                            </Button>
                        </div>
                    </div>
                }
            </div>);

    }
}