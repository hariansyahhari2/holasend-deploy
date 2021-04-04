import React, {useState} from "react";
import {Button, Modal, Toast} from "react-bootstrap";
import {Col, Row} from "reactstrap";

const ExportModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showBefore, setShowBefore] = useState(null);
    const [showAfter, setShowAfter] = useState(null);

    const [before, setBefore] = useState(null)
    const [after, setAfter] = useState(null)

    const toggleShowA = () => {
        if (showBefore) {
            setBefore(null)
        }
        setShowBefore(!showBefore)
    };
    const toggleShowB = () => {
        if (showAfter) {
            setAfter(null)
        }
        setShowAfter(!showAfter)
    };

    const OnResult = () => {
        let param = '';
        if (before) param+=`&before=${before}`
        if (after) param+=`&after=${after}`
        return(
            <Button variant="primary" href={`${process.env.REACT_APP_APIBASE_URL}/task/export?token=${localStorage.getItem('token')}${param}`}>
                Export
            </Button>
        )
    }
    
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Export
                &nbsp;
                <i className="fas fa-file-download" />
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
                    <p style={{fontWeight: 'bold'}}>Created Date</p>
                    <Row style={{display: 'flex'}}>
                        <Col xs={6}>
                            <Button variant="secondary" onClick={toggleShowB}>
                                After
                            </Button>
                            <Toast show={showAfter} onClose={toggleShowA}>
                                <Toast.Body>
                                    <input type="date" value={after} onChange={(e) => {setAfter(e.target.value)}}/>
                                </Toast.Body>
                            </Toast>
                        </Col>
                        <Col xs={6}>
                            <Button variant="secondary" onClick={toggleShowA}>
                                Before
                            </Button>
                            <Toast show={showBefore} onClose={toggleShowA}>
                                <Toast.Body>
                                    <input type="date" value={before} onChange={(e) => {setBefore(e.target.value)}}/>
                                </Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <OnResult />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExportModal;