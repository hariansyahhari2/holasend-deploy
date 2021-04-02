import {Modal} from "react-bootstrap";
import React from "react";

export const Loading = () => {
    return(
        <>
            <style type="text/css">
                {`
                    .modal-content {
                      background-color: rgba(0,0,0,0);
                    }
                `}
            </style>
            <Modal
                show={true}
                centered
                size="lg"
            >
                <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <img src="/holasend.gif" style={{ display: 'flex', width: '75%'}}/>
                </div>
            </Modal>
        </>

    )
}