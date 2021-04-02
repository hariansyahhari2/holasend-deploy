import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { Gap, Loading } from '../../../../components/atoms'
import { changePasswordAction } from '../../../../configs/actions/password/passwordAction'

const ChangePassword = (props) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    useEffect(() => {
        if (props.data) {
            swal("Success!", `Change password ${props.data.username} success!`, "success");
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
        }

        if (props.error) {
            swal("Error!", "Old Password invalid!", "error");
        }
    }, [props.data, props.error])

    // clear error message
    useEffect(() => {
        setOldPasswordError("")
        setNewPasswordError("")
        setConfirmPasswordError("")
    }, [oldPassword, newPassword, confirmPassword])

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            const data = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            props.dispatchChangePasswordAction(data)
        }
    }

    const validate = () => {
        let oldPasswordError = "";
        let newPasswordError = "";
        let confirmPasswordError = "";
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

        if (newPassword.length < 8) {
            newPasswordError = "Password must be more than 8 characters!";
        } else if (!newPassword.match(passwordRegex)) {
            newPasswordError = "Password must contain capital letters and numbers";
        }

        if (confirmPassword !== newPassword) {
            confirmPasswordError = "Confirm Password must match to New Password"
        } else if (confirmPassword.length < 8) {
            confirmPasswordError = "Password must be more than 8 characters!";
        }

        if (oldPasswordError || newPasswordError || confirmPasswordError) {
            setOldPasswordError(oldPasswordError);
            setNewPasswordError(newPasswordError);
            setConfirmPasswordError(confirmPasswordError)
            swal("Change Password Error!", "", "error");
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
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
                        <div className="login-box" style={{width: '500px'}}>
                            <div className="login-logo">
                                <h3 style={{color: '#666'}}>Change Your Password!</h3>
                            </div>
                            <div className="card">
                                <div className="card-body login-card-body" style={{margin: '30px'}}>
                                    <p className="login-box-msg">You are only one step a way from your new password, change your password now.</p>
                                    <Gap height={20} />
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old Password" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{fontSize: 12, color: "red"}}>{oldPasswordError}</div>
                                    <Gap height={30} />
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{fontSize: 12, color: "red"}}>{newPasswordError}</div>
                                    <Gap height={30} />
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{fontSize: 12, color: "red"}}>{confirmPasswordError}</div>
                                    <Gap height={30} />
                                    <div className="row">
                                        <div className="col-12">
                                            <button className="btn btn-primary btn-block" onClick={onSubmit} style={{backgroundColor: '#536DFE', borderRadius: '10px'}}>Change password</button>
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
        data: state.changePasswordReducer.data,
        isLoading: state.changePasswordReducer.isLoading,
        error: state.changePasswordReducer.error
    }
}

// action
const mapDispatchToProps = {
    dispatchChangePasswordAction : changePasswordAction
}

export default connect(mapStateToProps, mapDispatchToProps) (ChangePassword);