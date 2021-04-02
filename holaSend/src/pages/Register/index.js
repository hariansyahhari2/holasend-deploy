import React, { useEffect, useState } from 'react';
import { RegisterBg } from '../../assets';
import { Button, DropdownList, Gap, Input, Loading } from '../../components/atoms';
import './register.scss';
import swal from 'sweetalert';
import { registerAction } from '../../configs/actions/register/registerAction'
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom"


const Register = (props) => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [identityCategory, setIdentityCategory] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [identityCategoryError, setIdentityCategoryError] = useState('')
    const [identificationNumberError, setIdentificationNumberError] = useState('')
    const [contactNumberError, setContactNumberError] = useState('')

    useEffect(() => {
        // jika register sukses
        if (props.data) {
            swal("Registration Success!", "", "success").then(() => {
                return (
                    window.location.href = "/login"
                )
            })
        }

        // jika login error
        if (props.error) {
            swal("Registration Error!", `${props.error.message}`, "error");
        }
        
    }, [props.data, props.error])

    // clear error message
    useEffect(() => {
        setFirstnameError("")
        setLastnameError("")
        setEmailError("")
        setUsernameError("")
        setPasswordError("")
        setConfirmPasswordError("")
        setIdentityCategoryError("")
        setIdentificationNumberError("")
        setContactNumberError("")
    }, [
        firstname,
        lastname,
        email,
        username,
        password,
        confirmPassword,
        identityCategory,
        identificationNumber,
        contactNumber
    ])

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            const data = {
                user: {
                    username: username,
                    email: email,
                    password: password
                },
                userDetails: {
                    identityCategory: identityCategory,
                    identificationNumber: identificationNumber,
                    firstName: firstname,
                    lastName: lastname,
                    contactNumber: contactNumber
                }
            }
           
            props.dispatchRegisterAction(data)

        }
    }

    const validate = () => {
        let firstnameError = '';
        let lastnameError = "";
        let emailError = "";
        let usernameError = "";
        let passwordError = "";
        let confirmPasswordError = "";
        let identityCategoryError = "";
        let identificationNumberError = "";
        let contactNumberError = "";
        const usernameRegex = /[a-z0-9]{6,20}$/
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

        if (!firstname) {
            firstnameError = "Firstname must not blank!"
        }
        
        if (!lastname) {
            lastnameError = "Lastname must not blank!"
        }

        if (!email.match(emailRegex)) {
            emailError = "Invalid Email!"
        }

        if (!username.match(usernameRegex)) {
            usernameError = "Username must be more than 6 characters!";
        }
        
        if (password.length < 8) {
            passwordError = "Password must be more than 8 characters!";
        } else if (!password.match(passwordRegex)) {
            passwordError = "Password must contain capital letters and numbers";
        }

        if (confirmPassword !== password) {
            confirmPasswordError = "Confirm Password must match to Password"
        } else if (confirmPassword.length < 8) {
            confirmPasswordError = "Password must be more than 8 characters!";
        }

        if (!identityCategory) {
            identityCategoryError = "Identity Category must not blank!"
        }
        
        if (!identificationNumber) {
            identificationNumberError = "Identification Number must not blank!"
        }

        if (!contactNumber) {
            contactNumberError = "Contact Number must not blank!"
        }

        if (
            firstnameError ||
            lastnameError ||
            emailError || 
            usernameError || 
            passwordError ||
            confirmPasswordError ||
            identityCategoryError ||
            identificationNumberError ||
            contactNumberError
            ) {
            setFirstnameError(firstnameError);
            setLastnameError(lastnameError);
            setEmailError(emailError);
            setUsernameError(usernameError);
            setPasswordError(passwordError);
            setConfirmPasswordError(confirmPasswordError)
            setIdentityCategoryError(identityCategoryError);
            setIdentificationNumberError(identificationNumberError);
            setContactNumberError(contactNumberError);
            swal("Registration Error!", "", "error");
            return false;
        } 

        return true;
    }

    const handleDropdown = (identityCategory) => {
        setIdentityCategory(identityCategory)
    }

    return (
        <div className="main-page">
            <div className="left">
                <img src={RegisterBg} className="left-bg" alt="ilustrator" />
            </div>
            <div className="right">
                <Container
                    className="container"
                    error={props.error}
                    loading={props.loading}
                    style={{ marginTop: "50px" }}
                >
                    <p className="title">Register</p>
                    <Gap height={10} />
                    <Input label="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{firstnameError}</div>
                    <Gap height={20} />
                    <Input label="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{lastnameError}</div>
                    <Gap height={20} />
                    <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{emailError}</div>
                    <Gap height={20} />
                    <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{usernameError}</div>
                    <Gap height={20} />
                    <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{passwordError}</div>
                    <Gap height={20} />
                    <Input label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" type="password" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{confirmPasswordError}</div>
                    <Gap height={20} />
                    <DropdownList
                        label="Identity Category"
                        data={[
                            {value: "KTP", label: "KTP"},
                            {value: "SIM", label: "SIM"},
                            {value: "PASSPORT", label: "PASSPORT"}
                        ]}
                        value={identityCategory}
                        placeholder="Select Identity"
                        handleDropdown={handleDropdown}
                    />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{identityCategoryError}</div>
                    <Gap height={20} />
                    <Input label="Identification Number" value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} placeholder="Identification Number" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{identificationNumberError}</div>
                    <Gap height={20} />
                    <Input label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" />
                    <Gap height={10} />
                    <div style={{fontSize: 12, color: "red"}}>{contactNumberError}</div>
                    <Gap height={20} />
                    <Button title="Register" onClick={() => onSubmit()} />
                    <Gap height={30} />
                    <Link to="/login">
                        <a href="#">
                        <p style={{display: 'flex', justifyContent: 'center'}}>Back to Login</p>
                        </a>
                    </Link>
                    {props.isLoading ? <Loading /> : null}
                </Container>
            </div>
        </div>
    );
}

// reducer
const mapStateToProps = (state) => {
    return {
        data: state.registerReducer.data,
        isLoading: state.registerReducer.isLoading,
        error: state.registerReducer.error
    }
}

// action
const mapDispatchToProps = {
    dispatchRegisterAction : registerAction
}

export default connect(mapStateToProps, mapDispatchToProps) (Register);