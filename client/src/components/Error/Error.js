/**
 * show error in modal if user isn't loggedin or when the product purchasing group has closed
 */

import React from 'react'
import {Modal } from 'react-bootstrap'

export default (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="text-center text-danger fw-bold ">{props.errorMess}</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
