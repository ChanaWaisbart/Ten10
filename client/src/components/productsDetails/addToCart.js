/**
 * A modal that displays the product details and gives the option of adding to a shopping cart
 */
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap'
import Error from '../Error/Error'
import { productOrderUpdate } from '../../services/OrdersService'
import { productOrderConfirmation } from '../../services/ProductsServices'

// eslint-disable-next-line import/no-anonymous-default-export
export default (userDetails, product, updateReload) => {
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState({ loginError: false, productError: false })


    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (userDetails) {
            productOrderConfirmation(product.productName).then(
                confirm => {
                    if (confirm) {
                        setShow(true)
                    }
                    else {
                        setError({
                            ...error, productError: true
                        })
                    }
                }
            )
        }
        else {
            setError({ ...error, loginError: true })
        }
    }


    const handleClickButton = () => {
        !isLoading && setLoading(true)
        setTimeout(orderProduct, 1000)
    }

    const orderProduct = async () => {
        await productOrderUpdate(userDetails.id, product, 1)
        setLoading(false)
        setComplete(true)
        setTimeout(() => {
            updateReload()
            setComplete(false)
            handleClose()
        }, 2000)

    }

    return (
        <>
            <Button variant="outline-secondary" size="sm" onClick={handleShow}>
                לקניה מהירה
            </Button>

            <Modal show={show} onHide={handleClose} keyboard={!isLoading}>
                <Modal.Header closeButton>
                    <Modal.Title className="mr-5 mt-2">{!complete && product.productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {!complete ? <Row >
                        <Col>
                            <img style={{ width: 250 }} className="card-img" variant="top" alt="" src={product.productImage} />
                        </Col>
                        <div className="col text-right"  >
                            <Row > מחיר- {product.price} ₪ </Row>
                            <Row className="mt-2">שימו לב, הזמנת המוצר הינה התחייבות לביצוע הרכישה בפועל, באם תושלם קבוצת הרכישה של מוצר זה. <br /> אם לא תושלם הקבוצה ההזמנה תבוטל.
                                </Row>
                        </div>

                    </Row> :
                        <div className="text-center">
                            המוצר נוסף בהצלחה
                        </div>}
                </Modal.Body>
                <Modal.Footer>

                    {!complete && <Button variant="secondary" disabled={isLoading} onClick={handleClickButton}>
                        {isLoading ? 'מוסיף לעגלה' : 'אני רוצה להזמין'}

                    </Button>}
                </Modal.Footer>
            </Modal>
            {/* When there is a problem, a message is displayed to the user */}
            <Error show={error.loginError} onHide={() => setError({ ...error, loginError: false })} errorMess="יש לבצע כניסה לפני רכישה" />
            <Error show={error.productError} onHide={() => setError({ ...error, productError: false })} errorMess="קבוצת הרכישה של מוצר זה נסגרה" />


        </>
    );
}
