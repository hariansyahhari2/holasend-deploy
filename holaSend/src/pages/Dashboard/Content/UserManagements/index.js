import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import { 
    getAllUserAction, 
    putByUsernameMakeAdminAction, 
    putByUsernameMakeCourierAction, 
    putByUsernameMakeDisabledAction, 
    putByUsernameMakeStaffAction 
} from "../../../../configs/actions/user/userAction";
import {DropdownFilterRole, Loading, ModalView, PaginationButton} from "../../../../components/atoms";

const UserManagements = (props) => {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState({
        role: null
    })
    const [dataRole, setDataRole] = useState([
        { value: null, label: "ALL" },
        { value: "ADMIN", label: "ADMIN" },
        { value: "STAFF", label: "STAFF" },
        { value: "COURIER", label: "COURIER" },
        { value: "UNASSIGNED", label: "UNASSIGNED" },
        { value: "DISABLED", label: "DISABLED" },
    ])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    const totalPage = Math.ceil(props.pageInfo.total / props.pageInfo.size)

    useEffect(() => {
        onReload()
    }, [page, size])

    useEffect(() => {
        onReload()
    }, [])

    useEffect(() => {
        if (props.listUser) {
            setUsers(props.listUser)
        }
    }, [props.listUser])

    useEffect(() => {
        // jika sukses
        if (props.isAdmin) {
            swal("Confirm Role Success!", "", "success");
        }
        
        if (props.isStaff) {
            swal("Confirm Role Success!", "", "success");
        }
        
        if (props.isCourier) {
            swal("Confirm Role Success!", "", "success");
        }

        if (props.isDisability) {
            swal("Confirm Role Success!", "", "success");
        }

        onReload()

    }, [props.isAdmin, props.isStaff, props.isCourier, props.isDisability]);

    const onReload = () => {
        props.dispatchGetAllUserAction({page: page, size: size}, filter)
    }

    const onAdmin = (username) => {
        props.dispatchPutByUsernameMakeAdminAction(username)
    }

    const onStaff = (username) => {
        props.dispatchPutByUsernameMakeStaffAction(username)
    }

    const onCourier = (username) => {
        props.dispatchPutByUsernameMakeCourierAction(username)
    }

    const onDisabled = (username) => {
        props.dispatchPutByUsernameMakeDisabledAction(username)
    }

    const handleLimit = (limit) => {
        setSize(limit)
        setPage(0)
    }

    const onSetFilter = () => {
        setPage(0)
        onReload()
    }

    return (
        !props.isLoading ?
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid" style={{ marginTop: "50px" }}>
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1
                                className="m-0 text-dark"
                                style={{ paddingLeft: "35px" }}
                            >
                                User Managements
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3
                                        className="card-title"
                                        style={{ margin: "1rem" }}
                                    >
                                        List of Table
                                    </h3>
                                    <div className="card-tools">
                                        <div
                                            className="input-group input-group-sm"
                                            style={{
                                                margin: "0.5rem",
                                            }}
                                        >
                                            <DropdownFilterRole
                                            dataRole={dataRole} 
                                            onResult={onSetFilter}
                                            filter={filter}
                                            setFilter={setFilter}
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card-body table-responsive p-0"
                                    style={{ height: "52vh" }}
                                >
                                    <table className="table text-nowrap table-bordered table-head-fixed">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((e) => (
                                                <tr>
                                                    <td>{e.username}</td>
                                                    <td>{e.email}</td>
                                                    <td>{e.role}</td>
                                                    <td style={{display: 'flex', flexDirection: 'row'}}>
                                                        <ModalView
                                                            className="fas fa-eye btn-info"
                                                            title="User Info"
                                                            p1="Username"
                                                            c1={e.username}
                                                            p2="Email"
                                                            c2={e.email}
                                                            p3="Role"
                                                            c3={e.role}
                                                            p4="First Name"
                                                            c4={e.userDetails?.firstName || ''}
                                                            p5="Last Name"
                                                            c5={e.userDetails?.lastName || ''}
                                                            p6="Indentity Category"
                                                            c6={e.userDetails?.identityCategory || ''}
                                                            p7="Identification Number"
                                                            c7={e.userDetails?.identificationNumber || ''}
                                                            p8="Contact Number"
                                                            c8={e.userDetails?.contactNumber || ''}
                                                        />
                                                        <span
                                                            style={{
                                                                margin: "3px",
                                                            }}
                                                        />
                                                    {
                                                        e.username !== localStorage.getItem("username") ?
                                                        <DropdownButton id="dropdown-basic-button" title="Change Role">
                                                            <Dropdown.Item onClick={() => {
                                                                onAdmin(e.username)
                                                            }}>ADMIN</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => {
                                                                onStaff(e.username)
                                                            }}>STAFF</Dropdown.Item>
                                                            <Dropdown.Item  onClick={() => {
                                                                onCourier(e.username)
                                                            }}>COURIER</Dropdown.Item>
                                                            <Dropdown.Item  onClick={() => {
                                                                onDisabled(e.username)
                                                            }}>DISABLED</Dropdown.Item>
                                                        </DropdownButton> :
                                                        <Button disabled>
                                                            CURRENT USER
                                                        </Button>
                                                    }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PaginationButton
                        currentPage={page}
                        setPage={setPage}
                        totalPage={totalPage}
                        handleLimit={handleLimit}
                        size={size}
                    />
                </div>
            </div>
        </div>
        :
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container" style={{ marginTop: "50px" }}>
                    <Loading />
                </div>
            </div>
        </div>
    );
};

// reducer
const mapStateToProps = (state) => {
    return {
        listUser: state.getAllUserReducer.data,
        isLoading: state.getAllUserReducer.isLoading,
        error: state.getAllUserReducer.error,
        pageInfo:state.getAllUserReducer.pagination,
        isAdmin: state.putByUsernameMakeAdminReducer.data,
        isStaff: state.putByUsernameMakeStaffReducer.data,
        isCourier: state.putByUsernameMakeCourierReducer.data,
        isDisability: state.putByUsernameMakeDisabledReducer.data
    };
};

// action
const mapDispatchToProps = {
    dispatchGetAllUserAction: getAllUserAction,
    dispatchPutByUsernameMakeAdminAction: putByUsernameMakeAdminAction,
    dispatchPutByUsernameMakeStaffAction: putByUsernameMakeStaffAction,
    dispatchPutByUsernameMakeCourierAction: putByUsernameMakeCourierAction,
    dispatchPutByUsernameMakeDisabledAction: putByUsernameMakeDisabledAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagements);