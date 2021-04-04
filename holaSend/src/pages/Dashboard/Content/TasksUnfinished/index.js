import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Loading, ModalView } from '../../../../components/atoms';
import { deleteByIdTaskAction, getAllTaskUnfinishedAction } from '../../../../configs/actions/task/taskAction';

const TasksUnfinished = (props) => {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null)
    
    useEffect(() => {
        onReload();
    }, []);

    useEffect(() => {
        if (props.listTask) {
            setTasks(props.listTask);
        }

        if (props.error) {
            setError(props.error)
        }

    }, [props.error, props.listTask]);

    useEffect(() => {
        if (props.isDelete) {
            onReload();
        }
    }, [props.isDelete]);

    const onReload = () => {
        props.dispatchGetAllTaskUnfinishedAction();
    };

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
                                Unfinished Tasks
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
                                                            p5="Request By"
                                                            c5={e.requestBy ? e.requestBy.username : ""}
                                                            p6="Courier"
                                                            c6={e.courier ? e.courier.username : ""}
                                                            p7="Status"
                                                            c7={e.status}
                                                            p8="Priority"
                                                            c8={e.priority}
                                                            p9="Notes"
                                                            c9={e.notes}
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
                                                        
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
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
    )
}

// reducer
const mapStateToProps = (state) => {
    return {
        listTask: state.getAllTaskUnfinishedReducer.data,
        isLoading: state.getAllTaskUnfinishedReducer.isLoading,
        error: state.getAllTaskUnfinishedReducer.error,
        isDelete: state.deleteByIdTaskReducer.data,
    };
};

// action
const mapDispatchToProps = {
    dispatchGetAllTaskUnfinishedAction: getAllTaskUnfinishedAction,
    dispatchDeleteByIdTaskAction: deleteByIdTaskAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksUnfinished);