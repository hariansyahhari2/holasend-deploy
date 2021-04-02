import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Container } from 'reactstrap'
import swal from 'sweetalert'
import { Gap, Loading } from '../../components/atoms'
import { recoverPasswordAction } from '../../configs/actions/password/passwordAction'

const RecoverPassword = (props) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const {token} = useParams()
    const history = useHistory()

    useEffect(() => {
        if (token == null){
            history.push("/")
        }
    })

    useEffect(() => {
        if (props.data) {
            swal("Success!", `Change password ${props.data.username} success!`, "success");
            history.push("/login")
        }

        if (props.error) {
            swal("Error!", `${props.error}`, "error");
        }
    }, [props.data, props.error, history])

    // clear error message
    useEffect(() => {
        setPasswordError("")
        setConfirmPasswordError("")
    }, [password, confirmPassword])

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            const data = {
                password: password,
            }
            props.dispatchRecoverPasswordAction(token, data)
        }
    }

    const validate = () => {
        let passwordError = "";
        let confirmPasswordError = "";
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

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

        if (passwordError || confirmPasswordError) {
            setPasswordError(passwordError);
            setConfirmPasswordError(confirmPasswordError)
            swal("Change Password Error!", "", "error");
            return false;
        } 

        return true;
    }

    return (
        <div className="hold-transition login-page" style={{backgroundColor: 'white'}}>
            <div className="login-box" style={{width: '500px'}}>
                <div className="login-logo">
                    <h3 style={{color: '#666'}}>Change Your Password!</h3>
                </div>
                <Container
                    className="container"
                    error={props.error}
                    loading={props.isLoading}
                    style={{ marginTop: "50px" }}
                >
                    <div className="card">
                        <div className="card-body login-card-body" style={{margin: '30px'}}>
                            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div style={{fontSize: 12, color: "red"}}>{passwordError}</div>
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
                    {props.isLoading ? <Loading /> : null}
                </Container>
            </div>
        </div>

    )
}


// reducer
const mapStateToProps = (state) => {
    return {
        data: state.recoverPasswordReducer.data,
        isLoading: state.recoverPasswordReducer.isLoading,
        error: state.recoverPasswordReducer.error
    }
}

// action
const mapDispatchToProps = {
    dispatchRecoverPasswordAction : recoverPasswordAction
}

export default connect(mapStateToProps, mapDispatchToProps) (RecoverPassword);