import React, {useState} from "react";
import {Button, ButtonGroup, Modal, Toast, ToggleButton} from "react-bootstrap";
import { Gap } from "..";
import {Col, Row} from "reactstrap";

const DropdownFilterTask = ({destinations, users, dataPriority, dataStatus, onResult, filter, setFilter, task}) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showBefore, setShowBefore] = useState(filter.before !== null);
    const [showAfter, setShowAfter] = useState(filter.after !== null);

    const toggleShowA = () => {
        if (showBefore) {
            setFilter({...filter, before: null})
        }
        setShowBefore(!showBefore)
    };
    const toggleShowB = () => {
        if (showAfter) {
            setFilter({...filter, after: null})
        }
        setShowAfter(!showAfter)
    };

    const toggleStyle = {
        flexWrap: 'wrap'
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Filter By
                &nbsp;
                <i className="fas fa-filter" />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        destinations ?
                        <div>
                            <p style={{fontWeight: 'bold'}}>Destination</p>
                            <ButtonGroup toggle style={toggleStyle}>
                                {destinations.map((item) => (
                                    <ToggleButton
                                        key={item.value}
                                        type="radio"
                                        variant="primary"
                                        name="radio"
                                        value={filter.destinationId}
                                        checked={filter.destinationId === item.value}
                                        onChange={() => setFilter({...filter, destinationId: item.value})}
                                    >
                                        {item.label}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div> : null
                    }
                    {
                        users ? 
                        <div>
                            <Gap height={15} />
                            <p style={{fontWeight: 'bold'}}>Requested By</p>
                            <ButtonGroup toggle style={toggleStyle}>
                                {users.map((item) => (
                                    <ToggleButton
                                        key={item.value}
                                        type="radio"
                                        variant="primary"
                                        name="radio"
                                        value={filter.requestById}
                                        checked={filter.requestById === item.value}
                                        onChange={() => setFilter({...filter, requestById: item.value})}
                                    >
                                        {item.label}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div> : null
                    }
                    {
                        dataStatus ? 
                        <div>
                            <Gap height={15} />
                            <p style={{fontWeight: 'bold'}}>Status</p>
                            <ButtonGroup toggle style={toggleStyle}>
                                {dataStatus.map((item) => (
                                    <ToggleButton
                                        key={item.value}
                                        type="radio"
                                        variant="primary"
                                        name="radio"
                                        value={filter.status}
                                        checked={filter.status === item.value}
                                        onChange={() => setFilter({...filter, status: item.value})}
                                    >
                                        {item.label}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div> : null
                    }
                    {
                        dataPriority ?
                        <div>
                            <Gap height={15} />
                            <p style={{fontWeight: 'bold'}}>Priority</p>
                            <ButtonGroup toggle style={toggleStyle}>
                                {dataPriority.map((item) => (
                                    <ToggleButton
                                        key={item.value}
                                        type="radio"
                                        variant="primary"
                                        name="radio"
                                        value={filter.priority}
                                        checked={filter.priority === item.value}
                                        onChange={() => setFilter({...filter, priority: item.value})}
                                    >
                                        {item.label}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div> : null
                    }
                    {
                        task ? 
                        <div>
                            <Gap height={15} />
                            <p style={{fontWeight: 'bold'}}>Created Date</p>
                            <Row style={{display: 'flex'}}>
                                <Col xs={6}>
                                    <Button variant="primary" onClick={toggleShowB}>
                                        After
                                    </Button>
                                    <Toast show={showAfter} onClose={toggleShowA}>
                                        <Toast.Body>
                                            <input type="date" value={filter.after} onChange={(e) => {setFilter({...filter, after: e.target.value})}}/>
                                        </Toast.Body>
                                    </Toast>
                                </Col>
                                <Col xs={6}>
                                    <Button variant="primary" onClick={toggleShowA}>
                                        Before
                                    </Button>
                                    <Toast show={showBefore} onClose={toggleShowA}>
                                        <Toast.Body>
                                            <input type="date" value={filter.before} onChange={(e) => {setFilter({...filter, before: e.target.value})}}/>
                                        </Toast.Body>
                                    </Toast>
                                </Col>
                            </Row>
                        </div> : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onResult}>
                        Result
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DropdownFilterTask;