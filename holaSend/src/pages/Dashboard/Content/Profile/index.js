import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { DropdownList, Gap, Input, Loading } from '../../../../components/atoms'
import { getProfileAction, putProfileAction } from "../../../../configs/actions/profile/profileAction"

const Profile = (props) => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const [identityCategory, setIdentityCategory] = useState('')
    const [identificationNumber, setIdentificationNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [edited, setEdited] = useState(false)
    const [buttonText, setButtonText] = useState("Edit")
    const [buttonColor, setButtonColor] = useState('btn-warning')

    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [identityCategoryError, setIdentityCategoryError] = useState('')
    const [identificationNumberError, setIdentificationNumberError] = useState('')
    const [contactNumberError, setContactNumberError] = useState('')

    useEffect(() => {
        onReload();
    }, []);

    useEffect(() => {
        if (props.data) {
            onFillData()
        }

        if (props.error) {
            swal("Error!", `${props.error.message}`, "error");
        }
        
    }, [props.data, props.error])

    useEffect(() => {
        if (props.putProfile) {
            setEdited(false)
            swal("Update Profile Success!", "", "success");
            setButtonText("Edit")
            setButtonColor("btn-warning")
        }

        if (props.error) {
            swal("Update Profile Error!", "", "error");
        }

    }, [props.putProfile, props.error])

    // clear error message
    useEffect(() => {
        setFirstnameError("")
        setLastnameError("")
        setEmailError("")
        setIdentityCategoryError("")
        setIdentificationNumberError("")
        setContactNumberError("")
    }, [
        firstname,
        lastname,
        email,
        identityCategory,
        identificationNumber,
        contactNumber
    ])

    const onFillData = () => {
        setFirstname(props.data.userDetails.firstName)
        setLastname(props.data.userDetails.lastName)
        setEmail(props.data.email)
        setUsername(props.data.username)
        setRole(props.data.role)
        setIdentityCategory(props.data.userDetails.identityCategory)
        setIdentificationNumber(props.data.userDetails.identificationNumber)
        setContactNumber(props.data.userDetails.contactNumber)
    }

    const handleDropdown = (identityCategory) => {
        setIdentityCategory(identityCategory)
    }

    const onReload = () => {
        props.dispatchGetProfileAction()
    };

    const onEdit = () => {
        if (edited) {
            onFillData()
            setEdited(false)
            setButtonText("Edit")
            setButtonColor("btn-warning")
        } else {
            setEdited(true)
            setButtonText("Reset")
            setButtonColor("btn-danger")
        }
    }

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            const data = {
                username: username,
                email: email,
                userDetails: {
                    identityCategory: identityCategory,
                    identificationNumber: identificationNumber,
                    firstName: firstname,
                    lastName: lastname,
                    contactNumber: contactNumber
                }
            }
            props.dispatchPutProfileAction(data)
        }
    }

    const validate = () => {
        let firstnameError = '';
        let lastnameError = "";
        let emailError = "";
        let identityCategoryError = "";
        let identificationNumberError = "";
        let contactNumberError = "";
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!firstname) {
            firstnameError = "Firstname must not blank!"
        }
        
        if (!lastname) {
            lastnameError = "Lastname must not blank!"
        }

        if (!email.match(emailRegex)) {
            emailError = "Invalid Email!"
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
            identityCategoryError ||
            identificationNumberError ||
            contactNumberError
            ) {
            setFirstnameError(firstnameError);
            setLastnameError(lastnameError);
            setEmailError(emailError);
            setIdentityCategoryError(identityCategoryError);
            setIdentificationNumberError(identificationNumberError);
            setContactNumberError(contactNumberError);
            swal("Update Profile Error Validate!", "", "error");
            return false;
        } 

        return true;
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Container
                    className="container"
                    error={props.error}
                    loading={props.isLoading}
                    style={{ marginTop: "50px" }}
                >
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Profile User</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div className="card card-primary">
                                <div className="card-header" style={{backgroundColor: "#536DFE", padding: "1rem 3rem",}}>
                                    <Gap height={10} />
                                    <h3 className="card-title">About Me</h3>
                                </div>
                                <div className="card-body" style={{ padding: "1rem 3rem" }}>
                                    <Gap height={10} />
                                    <Input label="First Name" required={edited} value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" disabled={!edited} />
                                    <Gap height={10} />
                                    <div style={{fontSize: 12, color: "red"}}>{firstnameError}</div>
                                    <Gap height={20} />
                                    <Input label="Last Name" required={edited} value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" disabled={!edited} />
                                    <Gap height={10} />
                                    <div style={{fontSize: 12, color: "red"}}>{lastnameError}</div>
                                    <Gap height={20} />
                                    <Input label="Email" required={edited} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" disabled={!edited} />
                                    <Gap height={10} />
                                    <div style={{fontSize: 12, color: "red"}}>{emailError}</div>
                                    <Gap height={20} />
                                    <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" disabled={true} />
                                    <Gap height={20} />
                                    <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" disabled={true} />
                                    <Gap height={20} />
                                    <DropdownList
                                        label="Identity Category"
                                        required={edited}
                                        data={[
                                            {value: "KTP", label: "KTP"},
                                            {value: "SIM", label: "SIM"},
                                            {value: "PASSPORT", label: "PASSPORT"}
                                        ]}
                                        value={identityCategory}
                                        placeholder="Select Identity"
                                        handleDropdown={handleDropdown}
                                        disabled={!edited}
                                    />
                                    <Gap height={10} />
                                    <div style={{fontSize: 12, color: "red"}}>{identityCategoryError}</div>
                                    <Gap height={20} />
                                    <Input label="Identification Number" required={edited} value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} placeholder="Identification Number" disabled={!edited} />
                                    <Gap height={10} />
                                    <div style={{fontSize: 12, color: "red"}}>{identificationNumberError}</div>
                                    <Gap height={20} />
                                    <Input label="Contact Number" required={edited} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" disabled={!edited} />
                                    <Gap height={10} />
                                    <div style={{fontSize: 12, color: "red"}}>{contactNumberError}</div>
                                    <Gap height={20} />
                                </div>
                                <div className="card-footer" style={{ padding: "1rem 3rem" }}>
                                    <div className="row">
                                        <div className="col">
                                            <Button className={buttonColor} style={{width: "100%", padding: "12px", borderRadius: "12px",  textTransform: "uppercase"}}
                                                onClick={() => onEdit()}
                                            >
                                                {buttonText}
                                            </Button>
                                        </div>
                                        <div className="col">
                                            <Button style={{width: "100%", backgroundColor: '#536DFE', padding: "12px", borderRadius: "12px",  textTransform: "uppercase"}}
                                                onClick={() => onSubmit()}
                                                disabled={!edited}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.isLoading ? <Loading /> : null}
                </Container>
            </div>
        </div>
    )
}

// reducer
const mapStateToProps = (state) => {
    return {
        data: state.getProfileReducer.data,
        putProfile: state.putProfileReducer.data,
        isLoading: state.getProfileReducer.isLoading || state.putProfileReducer.isLoading,
        error: state.getProfileReducer.error || state.putProfileReducer.error
    }
}

// action
const mapDispatchToProps = {
    dispatchGetProfileAction : getProfileAction,
    dispatchPutProfileAction : putProfileAction
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);
