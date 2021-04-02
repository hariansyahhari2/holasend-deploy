import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import swal from 'sweetalert'
import { Gap, Loading } from '../../components/atoms'
import { forgetPasswordAction } from '../../configs/actions/password/passwordAction'

const ForgetPassword = (props) => {

    const [username, setUsername] = useState(null)
    
    useEffect(() => {
        if (props.data) {
            swal("Success!", `Check your email ${props.data} to reset your new password`, "success");
        }

        if (props.error) {
            swal("Error!", "Username Not Found!", "error");
        }
        setUsername("")
    }, [props.data, props.error])

    const onSubmit = () => {
        props.dispatchForgetPasswordAction(username)
    }

    return (
        <div className="hold-transition login-page" style={{backgroundColor: 'white'}}>
            <div className="login-box" style={{width: '500px'}}>
                <div className="login-logo">
                    <h3 style={{color: '#666'}}>Please Input Your Username!</h3>
                </div>
                <Container
                    className="container"
                    error={props.error}
                    loading={props.isLoading}
                    style={{ marginTop: "50px" }}
                >
                    <div className="card">
                        <div className="card-body login-card-body" style={{margin: '10px'}}>
                            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                            <div className="input-group mb-3">
                                <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <Gap height={20} />
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn btn-primary btn-block" onClick={onSubmit} style={{backgroundColor: '#536DFE', borderRadius: '10px'}}>Reset new password</button>
                                </div>
                            </div>
                            <Gap height={50} />
                            <div className="row" >
                                <div className="col" style={{display: 'flex', justifyContent: 'flex-start'}}>
                                    <Link to="/login">
                                        <a href="#">
                                        <p>Back to Login</p>
                                        </a>
                                    </Link>
                                </div>
                                <div className="col" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Link to="/register">
                                        <a href="#">
                                        <p>Register</p>
                                        </a>
                                    </Link>
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
        data: state.forgetPasswordReducer.data,
        isLoading: state.forgetPasswordReducer.isLoading,
        error: state.forgetPasswordReducer.error
    }
}

// action
const mapDispatchToProps = {
    dispatchForgetPasswordAction : forgetPasswordAction
}

export default connect(mapStateToProps, mapDispatchToProps) (ForgetPassword);