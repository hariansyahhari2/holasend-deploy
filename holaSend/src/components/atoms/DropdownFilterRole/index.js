import React, {useState} from "react";
import {Button, ButtonGroup, Modal, Toast, ToggleButton} from "react-bootstrap";

const DropdownFilterRole = ({dataRole, onResult, filter, setFilter}) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                        dataRole ?
                        <div>
                            <p style={{fontWeight: 'bold'}}>Role</p>
                            <ButtonGroup toggle style={toggleStyle}>
                                {dataRole.map((item) => (
                                    <ToggleButton
                                        key={item.value}
                                        type="radio"
                                        variant="primary"
                                        name="radio"
                                        value={filter.role}
                                        checked={filter.role === item.value}
                                        onChange={() => setFilter({...filter, role: item.value})}
                                    >
                                        {item.label}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
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

export default DropdownFilterRole;