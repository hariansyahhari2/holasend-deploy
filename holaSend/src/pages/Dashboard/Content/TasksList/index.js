import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import {
    DropdownFilterTask, ExportModal,
    Loading,
    ModalView,
} from "../../../../components/atoms";
import { getAllDestinationsFilterAction } from "../../../../configs/actions/destinations/destinationsAction";
import {
    deleteByIdTaskAction,
    getAllTaskAction,
    putTaskDoneByAdminAction,
} from "../../../../configs/actions/task/taskAction";
import { getAllUserFilterAction } from "../../../../configs/actions/user/userAction";
import {PaginationButton} from "../../../../components/atoms/Button";
import {ButtonGroup} from "reactstrap";

const TasksList = (props) => {

    const [tasks, setTasks] = useState([]);
    const [destinations] = useState([
        { value: null, label: 'All'}
    ])
    const [users] = useState([
        { value: null, label: 'All'}
    ])
    const [error, setError] = useState(null)
    const [dataPriority] = useState([
        { value: null, label: "ALL" },
        { value: "HIGH", label: "HIGH" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "LOW", label: "LOW" },
    ])
    const [dataStatus] = useState([
        { value: null, label: "ALL" },
        { value: "WAITING", label: "WAITING" },
        { value: "ASSIGNED", label: "ASSIGNED" },
        { value: "PICKUP", label: "PICKUP" },
        { value: "DELIVERED", label: "DELIVERED" },
    ])
    const [filter, setFilter] = useState({
        status: null,
        destinationId: null,
        requestById: null,
        priority: null,
        before: null,
        after: null
    })
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    const totalPage = Math.ceil(props.pageInfo.total / props.pageInfo.size)

    useEffect(() => {
        onReload()
    }, [page, size])

    useEffect(() => {
        onReload();
    }, []);

    useEffect(() => {
        if (props.listDestinations) {
            if (destinations.length === 1) {
                props.listDestinations.map(
                    destination => {
                        destinations.push({
                            value: destination.id,
                            label: destination.name
                        })
                    }
                )
            }
        }
        if (props.listUser) {
            if (users.length === 1) {
                props.listUser.map(
                    user => users.push({
                        value: user.id,
                        label: user.username
                    })
                )
            }
        }
        if (props.listTask) {
            setTasks(props.listTask);
        }
    }, [props.listDestinations, props.listUser, props.listTask]);

    useEffect(() => {
        if (props.error) {
            setError(props.error)
        }
    }, [props.error]);

    useEffect(() => {
        if (props.isDelete) {
            console.log("ini props delete", props.isDelete);
            onReload();
        }
    }, [props.isDelete]);

    useEffect(() => {
        if (props.doneByAdmin) {
            console.log("ini props done", props.doneByAdmin);
            onReload();
        }
    }, [props.doneByAdmin]);

    const onReload = () => {
        props.dispatchGetAllTaskAction({page: page, size: size}, filter);
        props.dispatchGetAllDestinationsFilterAction();
        props.dispatchGetAllUserFilterAction()
    };

    const handleLimit = (limit) => {
        setSize(limit)
        setPage(0)
    }

    const onSetFilter = () => {
        setPage(0)
        onReload()
    }

    const onDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                props.dispatchDeleteByIdTaskAction(id);
                swal("Poof! Your Task has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your Task is safe!");
            }
        });
    };

    const onFinish = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to back this Task status!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willFinish) => {
            if (willFinish) {
                console.log("ini id", id);
                props.dispatchPutTaskDoneByAdmin(id)
                swal("Poof! Your Task Done!", {
                    icon: "success",
                });
            } else {
                swal("Your Task is safe!");
            }
        });
        
    }

    console.log("ini done", props.doneByAdmin);

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
                                Tasks Report
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
                                            <ButtonGroup>
                                                <ExportModal />
                                                <DropdownFilterTask
                                                    destinations={destinations}
                                                    users={users}
                                                    dataPriority={dataPriority}
                                                    dataStatus={dataStatus}
                                                    onResult={onSetFilter}
                                                    filter={filter}
                                                    setFilter={setFilter}
                                                    task={true}
                                                />
                                            </ButtonGroup>
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
                                                <th>Destination</th>
                                                <th>Status</th>
                                                <th>Priority</th>
                                                <th>Notes</th>
                                                <th>Requested By</th>
                                                <th>Courier</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((e) => (
                                                <tr>
                                                    <td>
                                                        {e.destination.name}
                                                    </td>
                                                    <td>{e.status}</td>
                                                    <td>{e.priority}</td>
                                                    <td>{e.notes}</td>
                                                    <td>
                                                        <ModalView
                                                            className="fas fa-eye btn-primary"
                                                            title="User Info"
                                                            p1="Username"
                                                            c1={e.requestBy.username}
                                                            p2="Email"
                                                            c2={e.requestBy.email}
                                                            p3="Role"
                                                            c3={e.requestBy.role}
                                                            p4="First Name"
                                                            c4={e.requestBy.userDetails.firstName}
                                                            p5="Last Name"
                                                            c5={e.requestBy.userDetails.lastName}
                                                            p6="Indentity Category"
                                                            c6={e.requestBy.userDetails.identityCategory}
                                                            p7="Identification Number"
                                                            c7={e.requestBy.userDetails.identificationNumber}
                                                            p8="Contact Number"
                                                            c8={e.requestBy.userDetails.contactNumber}
                                                        />
                                                        <span
                                                            style={{
                                                                margin: "3px",
                                                            }}
                                                        />
                                                        {e.requestBy
                                                            ? e.requestBy
                                                                  .username
                                                            : ""}
                                                    </td>
                                                    <td>
                                                        {e.courier ?
                                                            <ModalView
                                                                className="fas fa-eye btn-primary"
                                                                title="User Info"
                                                                p1="Username"
                                                                c1={e.courier.username}
                                                                p2="Email"
                                                                c2={e.courier.email}
                                                                p3="Role"
                                                                c3={e.courier.role}
                                                                p4="First Name"
                                                                c4={e.courier.userDetails.firstName}
                                                                p5="Last Name"
                                                                c5={e.courier.userDetails.lastName}
                                                                p6="Indentity Category"
                                                                c6={e.courier.userDetails.identityCategory}
                                                                p7="Identification Number"
                                                                c7={e.courier.userDetails.identificationNumber}
                                                                p8="Contact Number"
                                                                c8={e.courier.userDetails.contactNumber}
                                                            /> : null}
                                                        <span
                                                            style={{
                                                                margin: "3px",
                                                            }}
                                                        />
                                                        {e.courier ? e.courier.username : ""}
                                                    </td>
                                                    <td>
                                                        <ModalView
                                                            className="fas fa-eye btn-info"
                                                            title="Detail Task"
                                                            p1="Created Date"
                                                            c1={e.createDate.substring(0, 19).replace("T", " ")}
                                                            p2="Destination"
                                                            c2={e.destination.name}
                                                            p3="Address"
                                                            c3={e.destination.address}
                                                            p4="Pick Up Time"
                                                            c4={e. pickUpTime ? e.pickUpTime.substring(0, 19).replace("T", " ") : "Haven't Picked Up"}
                                                            p5="Delivered Time"
                                                            c5={e. deliveredTime ? e.deliveredTime.substring(0, 19).replace("T", " ") : "Haven't Delivered"}
                                                            p6="Request By"
                                                            c6={e.requestBy ? e.requestBy.username : ""}
                                                            p7="Courier"
                                                            c7={e.courier ? e.courier.username : ""}
                                                            p8="Return Time"
                                                            c8={e.courierActivity ? e.courierActivity.returnTime?.substring(0, 19).replace("T", " ") : "Haven't Returned"}
                                                            p9="Status"
                                                            c9={e.status}
                                                            p10="Priority"
                                                            c10={e.priority}
                                                            p11="Notes"
                                                            c11={e.notes}
                                                        />
                                                        <span
                                                            style={{
                                                                margin: "3px",
                                                            }}
                                                        />
                                                        {
                                                            e.status == "WAITING" || e.status == "ASSIGNED" ? 
                                                            <Button
                                                            className="fas fa-trash-alt btn-danger"
                                                            onClick={() =>
                                                                onDelete(e.id)
                                                            }
                                                            /> :
                                                            <Button
                                                            className="fas fa-trash-alt btn-danger"
                                                            onClick={() =>
                                                                onDelete(e.id)
                                                            } disabled />
                                                        }
                                                        <span
                                                            style={{
                                                                margin: "3px",
                                                            }}
                                                        />
                                                        {
                                                            e.status == "PICKUP" ? 
                                                            <Button
                                                            className="fas fa-check-square btn-success"
                                                            onClick={() =>
                                                                onFinish(e.id)
                                                            } /> : null
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
        listTask: state.getAllTaskReducer.data,
        doneByAdmin: state.putTaskDoneByAdminReducer.data,
        isLoading: state.getAllTaskReducer.isLoading || state.putTaskDoneByAdminReducer.isLoading,
        error: state.getAllTaskReducer.error || state.putTaskDoneByAdminReducer.error,
        pageInfo: state.getAllTaskReducer.pagination,
        isDelete: state.deleteByIdTaskReducer.data,
        listDestinations: state.getAllDestinationsFilterReducer.data,
        listUser: state.getAllUserFilterReducer.data,
    };
};

// action
const mapDispatchToProps = {
    dispatchGetAllTaskAction: getAllTaskAction,
    dispatchDeleteByIdTaskAction: deleteByIdTaskAction,
    dispatchGetAllDestinationsFilterAction: getAllDestinationsFilterAction,
    dispatchGetAllUserFilterAction: getAllUserFilterAction,
    dispatchPutTaskDoneByAdmin: putTaskDoneByAdminAction
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
