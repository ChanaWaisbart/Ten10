/**
 * A modal that displays a message that the item has been successfully added to the shopping cart
 */
import React from 'react'
import {Modal } from 'react-bootstrap'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center fw-bold">המוצר נוסף בהצלחה</Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}
