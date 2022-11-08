import React from 'react'
import {Toast, ToastContainer} from "react-bootstrap"

const AlertToast = ({show, msg, status, handleToast}) => {
    setTimeout(() => {
        handleToast()
    }, 3000)
    return (
        <ToastContainer position="top-end">
            <Toast className="d-inline-block m-1" bg={status} show={show}>
                <Toast.Body className="d-flex text-white">
                    {msg}
                    <button type="button" className="btn-close me-2 m-auto btn-close-white" aria-label="Close" onClick={handleToast}></button>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default AlertToast