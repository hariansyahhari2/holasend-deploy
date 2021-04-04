import React, { useEffect, useState } from 'react';
import { LoginBg } from '../../assets';
import { Button, Gap, Input, Loading } from '../../components/atoms';
import swal from 'sweetalert';
import { loginAction } from '../../configs/actions/login/loginAction'
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import './login.scss'
import { Link } from "react-router-dom"

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [validation, setValidation] = useState('');

    useEffect(() => {
        // jika login sukses
        if (props.data) {
            if (props.data.role == "ADMIN" || props.data.role == "STAFF" ) {
                localStorage.setItem('token', props.data.token)
                localStorage.setItem('role', props.data.role)
                localStorage.setItem('username', props.data.username)
                return (
                    window.location.href = "/dashboard"
                )
            } else {
                swal("Login Error!", "Account not allowed!", "error");
            }
        }

        // jika login error
        if (props.error) {
            setValidation("Username or Password invalid!")
            swal("Login Error!", "Username or Password invalid!", "error");
        }

    }, [props.data, props.error])

    // clear error message
    useEffect(() => {
        setValidation("")
        setUsernameError("")
        setPasswordError("")
    }, [username, password])

    const onSubmit = (e) => {
        e.preventDefault()
        const isValid = validate();
        if (isValid) {
            const data = {
                username: username,
                password: password
            }
            // call axios dengan memanggil action/dispatch nya
            props.dispatchLoginAction(data)

        }
    }

    const validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (!username) {
            usernameError = "Name cannot be blank!";
        }

        if (!password) {
            passwordError = "Password cannot be blank!";
        }

        if (usernameError || passwordError) {
            setUsernameError(usernameError);
            setPasswordError(passwordError);
            swal("Login Error!", "", "error");
            return false;
        }

        return true;
    }

    return (
        <div className="main-page-login">
                <div className="left-login">
                    <img src={LoginBg} className="left-bg-login" alt="ilustrator" />
                </div>
                <div className="right-login">
                    <Container
                        className="container"
                        error={props.error}
                        loading={props.isLoading}
                        style={{ marginTop: "50px" }}
                    >
                        <p className="title-login">Login</p>
                        <form method="POST" onSubmit={onSubmit}>
                            <Gap height={18} />
                            <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            <Gap height={8} />
                            <div style={{ fontSize: 12, color: "red" }}>{usernameError}</div>
                            <Gap height={18} />
                            <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                            <Gap height={8} />
                            <div style={{ fontSize: 12, color: "red" }}>{passwordError}</div>
                            <Gap height={18} />
                            <div style={{ fontSize: 12, color: "red" }}>{validation}</div>
                            <Gap height={30} />
                            <Button title="Login" onClick={onSubmit} />
                        </form>
                        <Gap height={50} />
                        <div className="row" >
                            <div className="col" style={{display: 'flex', justifyContent: 'space-around'}}>
                                <Link to="/register">
                                    <a href="#">
                                    <p>Register a new member?</p>
                                    </a>
                                </Link>
                            </div>
                            <div className="col" style={{display: 'flex', justifyContent: 'space-around'}}>
                                <Link to="/forget-password">
                                    <a href="#">
                                    <p>Forget Password?</p>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        {props.isLoading ? <Loading /> : null}
                    </Container>
                </div>
        </div>
    );
}

// reducer
const mapStateToProps = (state) => {
    return {
        data: state.loginReducer.data,
        isLoading: state.loginReducer.isLoading,
        error: state.loginReducer.error
    }
}

// action
const mapDispatchToProps = {
    dispatchLoginAction: loginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
