import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalView = ({
    title, 
    p1,c1,
    p2,c2,
    p3,c3,
    p4,c4,
    p5,c5,
    p6,c6,
    p7,c7,
    p8,c8,
    p9,c9,
    p10,c10,
    p11,c11, ...rest}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} {...rest} />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{p1} : {c1}</p>
                    <p>{p2} : {c2}</p>
                    <p>{p3} : {c3}</p>
                    <p>{p4} : {c4}</p>
                    <p>{p5} : {c5}</p>
                    <p>{p6} : {c6}</p>
                    <p>{p7} : {c7}</p>
                    <p>{p8} : {c8}</p>
                    { p9 ? <p>{p9} : {c9}</p> : null }
                    { p10 ? <p>{p10} : {c10}</p> : null }
                    { p11 ? <p>{p11} : {c11}</p> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalView;
