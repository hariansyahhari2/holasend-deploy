import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Loading, PaginationButton } from "../../../../components/atoms";
import {
    deleteByIdDestinationsAction,
    getAllDestinationsAction,
} from "../../../../configs/actions/destinations/destinationsAction";
import { Link, useHistory } from 'react-router-dom'

const DestinationsList = (props) => {
    const [role] = useState(localStorage.getItem("role"))
    const [destinations, setDestinations] = useState([]);
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    const history = useHistory()

    const totalPage = Math.ceil(props.pageInfo.total / props.pageInfo.size)

    useEffect(() => {
        onReload()
    }, [page, size])

    useEffect(() => {
        onReload();
    }, []);

    useEffect(() => {
        if (props.listDestinations) {
            setDestinations(props.listDestinations);
        }
    }, [props.listDestinations]);

    useEffect(() => {
        if (props.isDelete) {
            onReload();
        }
    }, [props.isDelete]);

    const onReload = () => {
        props.dispatchGetAllDestinationsAction({page: page, size: size});
    };

    const handleLimit = (limit) => {
        setSize(limit)
        setPage(0)
    }

    const onDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Destinations!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                props.dispatchDeleteByIdDestinationsAction(id);
                swal("Poof! Your Destinations has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your Destinations is safe!");
            }
        });
    };

    const onEdit = (id) => {
        history.push(`/dashboard/create-destinations/${id}`)
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
                                Destinations List
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
                                                <th>Name</th>
                                                <th>Address</th>
                                                {/* <th>Longitude</th>
                                                <th>Latitude</th> */}
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {destinations.map((e) => (
                                                <tr>
                                                    <td>{e.name}</td>
                                                    <td>{e.address}</td>
                                                    {/* <td>{e.lon}</td>
                                                    <td>{e.lat}</td> */}
                                                    {
                                                        role == "ADMIN" ?
                                                        <td>
                                                            <Button
                                                                className="fas fa-trash-alt btn-danger"
                                                                onClick={() =>
                                                                    onDelete(e.id)
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    margin: "3px",
                                                                }}
                                                            />
                                                            <Button
                                                                className="fas fa-edit btn-warning"
                                                                onClick={() =>
                                                                    onEdit(e.id)
                                                                }
                                                            />
                                                        </td> : 
                                                        <td>
                                                            <Button
                                                                className="fas fa-trash-alt btn-danger"
                                                                disabled
                                                            />
                                                            <span
                                                                style={{
                                                                    margin: "3px",
                                                                }}
                                                            />
                                                            <Button
                                                                className="fas fa-edit btn-warning"
                                                                disabled
                                                            />
                                                        </td>
                                                    }
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
        listDestinations: state.getAllDestinationsReducer.data,
        isLoading: state.getAllDestinationsReducer.isLoading,
        error: state.getAllDestinationsReducer.error,
        pageInfo: state.getAllDestinationsReducer.pagination,
        isDelete: state.deleteByIdDestinationsReducer.data,
    };
};

// action
const mapDispatchToProps = {
    dispatchGetAllDestinationsAction: getAllDestinationsAction,
    dispatchDeleteByIdDestinationsAction: deleteByIdDestinationsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationsList);
