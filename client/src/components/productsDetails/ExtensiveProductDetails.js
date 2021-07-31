/**
 * Displays the product details in detail and there is an option to add the product to the shopping cart
 */
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import queryString from 'query-string'
import { productOrderUpdate } from '../../services/OrdersService'
import { productOrderConfirmation } from '../../services/ProductsServices'
import Error from '../Error/Error'
import SuccessOrder from './SuccessOrder'

export default (props) => {

    const [product, setProduct] = useState(null)
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState({ loginError: false, productError: false, orderSuccess: false })



    useEffect(() => {
        let details = queryString.parse(props.location.search)
        setProduct({
            amountOrdered: parseInt(details.amountOrdered),
            price: parseInt(details.price),
            productDetails: details.productDetails,
            productImage: details.productImage,
            productName: details.productName,
            id: parseInt(details.id)
        })
        details.userId && setUserId(details.userId)
    }, [],
    )

    const orderProduct = async () => {
        if (!userId) {
            setError({ ...error, loginError: true });
            return
        }
        else {
            let confirm = await productOrderConfirmation(product.productName)
            if (confirm) {
                await productOrderUpdate(userId, product, 1)
                setError({ ...error, orderSuccess: true })
            }
            else {
                setError({
                    ...error, productError: true
                })
            }
        }
    }

    const popover = (
        <Popover>
            <Popover.Title as="h3">שימו לב</Popover.Title>
            <Popover.Content>
                הזמנת המוצר הינה התחייבות לביצוע התשלום באם תסגר קבוצת הרכישה של מוצר זה.
             </Popover.Content>
        </Popover>
    );


    return (<>
        {product ? <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-4 mt-4 ml-5">
                        <div className="h-50">
                            <h4 className="border border-top-0 border-right-0 border-left-0 border-secondary pb-3">
                                {product.productName}
                            </h4>
                            <div className="mt-3">
                                {product.productDetails}
                            </div>
                            <div className="mt-3">
                               {`מחיר ${product.price}`}
                            </div>
                        </div>
                        <div className=" mt-5 pt-5">
                            {/* Add to cart button */}
                            <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popover}>
                                <button type="button" className="btn btn-danger w-100" onClick={orderProduct}>
                                    <h1 className="fw-bold mx-auto text-center mb-n4">לרכישה
                                            <i className="bi bi-exclamation m-n4 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                                            </svg>
                                        </i>
                                    </h1>
                                    <h3 className="text-warning">הזריזים מרויחים
                                        <i className="bi bi-exclamation m-n4 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                                            </svg>
                                        </i></h3>
                                </button>
                            </OverlayTrigger>

                        </div>

                    </div>
                    <div className="col-1 ml-4 border border-top-0 border-right-0 border-bottom-0 border-secondary"></div>
                    <div className="col-1"></div>
                    <div className="col-4">
                        <div className="mt-2">
                            <img className="img" src={`../../${product.productImage}`} />
                        </div>
                    </div>

                </div>
            </div>
            {/* When there is a problem or when a shopping cart is added, a message is displayed to the user */}
            <Error show={error.loginError} onHide={() => setError({ ...error, loginError: false })} errorMess="יש לבצע כניסה לפני רכישה" />
            <Error show={error.productError} onHide={() => setError({ ...error, productError: false })} errorMess="קבוצת הרכישה של מוצר זה נסגרה" />
            <SuccessOrder show={error.orderSuccess} onHide={() => setError({ ...error, orderSuccess: false })} />
        </> : "Loading..."}
    </>
    )
}
