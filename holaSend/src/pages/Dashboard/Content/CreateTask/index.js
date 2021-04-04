import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import {
    Button,
    DropdownList,
    Gap,
    Loading,
    TextArea,
} from "../../../../components/atoms";
import { getAllDestinationsFilterAction } from "../../../../configs/actions/destinations/destinationsAction";
import { postTaskAction } from "../../../../configs/actions/task/taskAction";

const CreateTask = (props) => {
    const [destinations, setDestinations] = useState([]);
    const [priority, setPriority] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [destinationsData] = useState([]);
    const [notes, setNotes] = useState("");

    const [destinationsError, setDestinationsError] = useState("");
    const [priorityError, setPriorityError] = useState("");
    const [notesError, setNotesError] = useState("");

    //1
    useEffect(() => {
        onReload();
    }, []);

    //2
    useEffect(() => {
        if (props.listDestinations) {
            setDestinations(props.listDestinations);
        }
    }, [props.listDestinations]);

    //3
    useEffect(() => {
        if (destinations) {
            if (destinationsData.length !== destinations.length) {
                onReload();
                for (var i = 0; i < destinations.length; i++) {
                    var valueAndLabel = {
                        value: destinations[i].id,
                        label: destinations[i].name,
                    };
                    destinationsData.push(valueAndLabel);
                }
            }
        }
    }, [destinations]);

    useEffect(() => {
        // jika sukses
        if (props.data) {
            swal("Create Task Success!", "", "success");
            setDestinationId("");
            setPriority("");
            setNotes("");
        }

        // jika error
        if (props.error) {
            swal("Create Task Error!", `${props.error.message}`, "error");
        }
    }, [props.data, props.error]);

    // clear error message
    useEffect(() => {
        setDestinationsError("");
        setPriorityError("");
        setNotesError("");
    }, [destinationId, priority, notes]);

    const onReload = () => {
        props.dispatchGetAllDestinationsFilterAction();
    };

    const onSubmit = () => {
        const isValid = validate();
        if (isValid) {
            const data = {
                destinationId: destinationId,
                priority: priority,
                notes: notes,
            };
            props.dispatchPostTaskAction(data);
        }
    };

    const validate = () => {
        let destinationsError = "";
        let priorityError = "";
        let notesError = "";

        if (!destinationId) {
            destinationsError = "Destination must not blank!";
        }

        if (!priority) {
            priorityError = "Priority must not blank!";
        }

        if (!notes) {
            notesError = "Notes must not blank!";
        }

        if (destinationsError || priorityError || notesError) {
            setDestinationsError(destinationsError);
            setPriorityError(priorityError);
            setNotesError(notesError);
            swal("Create Task Error!", "", "error");
            return false;
        }

        return true;
    };

    const handleDropdownDestinations = (destinations) => {
        setDestinationId(destinations);
    };

    const handleDropdownPriority = (priority) => {
        setPriority(priority);
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Container
                    className="container"
                    error={props.error}
                    loading={props.loading}
                    style={{ marginTop: "50px" }}
                >
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Task Form</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div className="card card-primary">
                                <div
                                    className="card-header"
                                    style={{
                                        backgroundColor: "#536DFE",
                                        padding: "1rem 3rem",
                                    }}
                                >
                                    <Gap height={10} />
                                    <h3 className="card-title">Create Task</h3>
                                </div>
                                <div
                                    className="card-body"
                                    style={{ padding: "1rem 3rem" }}
                                >
                                    <DropdownList
                                        label="Destination"
                                        required={true}
                                        data={destinationsData}
                                        value={destinationId}
                                        placeholder="Select Destination"
                                        handleDropdown={
                                            handleDropdownDestinations
                                        }
                                    />
                                    <Gap height={10} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {destinationsError}
                                    </div>
                                    <Gap height={15} />
                                    <DropdownList
                                        label="Priority"
                                        required={true}
                                        data={[
                                            { value: "HIGH", label: "HIGH" },
                                            {
                                                value: "MEDIUM",
                                                label: "MEDIUM",
                                            },
                                            { value: "LOW", label: "LOW" },
                                        ]}
                                        value={priority}
                                        placeholder="Select Priority"
                                        handleDropdown={handleDropdownPriority}
                                    />
                                    <Gap height={10} />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {priorityError}
                                    </div>
                                    <Gap height={15} />
                                    <TextArea
                                        label="Notes"
                                        required={true}
                                        value={notes}
                                        onChange={(e) =>
                                            setNotes(e.target.value)
                                        }
                                        placeholder="Notes"
                                    />
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {notesError}
                                    </div>
                                </div>
                                <div
                                    className="card-footer"
                                    style={{ padding: "1rem 3rem" }}
                                >
                                    <Button
                                        title="Submit"
                                        onClick={() => onSubmit()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.isLoading ? <Loading /> : null}
                </Container>
            </div>
        </div>
    );
};

// reducer
const mapStateToProps = (state) => {
    return {
        listDestinations: state.getAllDestinationsFilterReducer.data,
        data: state.postTaskReducer.data,
        isLoading:
            state.postTaskReducer.isLoading ||
            state.getAllDestinationsFilterReducer.loading,
        error:
            state.postTaskReducer.error ||
            state.getAllDestinationsFilterReducer.error,
    };
};

// action
const mapDispatchToProps = {
    dispatchGetAllDestinationsFilterAction: getAllDestinationsFilterAction,
    dispatchPostTaskAction: postTaskAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
