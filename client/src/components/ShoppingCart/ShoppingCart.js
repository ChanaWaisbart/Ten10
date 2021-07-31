/**
 * Displays all the products in the user's shopping cart, 
 * while dividing them into products whose purchasing group has not yet been completed
 *  and it is possible to cancel their order.
 *  And products that the purchasing group has completed and the user must make the payment
 */


import React, { useEffect, useState } from 'react';
import CartProductDetails from './CartProductDetails'
import { getUserOrdersProducts } from '../../services/OrdersService'
import { Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import Error from '../Error/Error';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [userCart, setUserCart] = useState(null)
    const [total, setTotal] = useState(0)
    const [completeProducts, setCompleteProducts] = useState([])
    const [reload, setReload] = useState(false)
    const [pathParams, setPathParams] = useState("")
    const [error, setError] = useState(true)


    const updateReload = () => {
        setReload(!reload)
    }

    const handleClose = () => {
        setError(false)
        props.history.push("/")
    }

    useEffect(() => {
        if (props.userDetails) {
            getUserOrdersProducts(props.userDetails.id)
                .then(userProducts => {
                    setUserCart(userProducts)
                    let complete = userProducts.filter(order => order.amountOrdered === 10)
                    let totalPrice = complete.map(order => order.amount * order.price)
                    totalPrice = totalPrice.reduce((a, b) => {
                        return a + b;
                    }, 0)
                    setTotal(totalPrice)
                    setCompleteProducts(complete)
                    let params = complete.map(order => order.id)
                    setPathParams(params.toString())
                })
        }
    }, [props, reload])

    return (<>

        {
            props.userDetails ? <div className="container">
                <div className="mt-5">
                    {/* View all products whose purchasing group has not yet been completed */}
                    {userCart ? <>
                        <div className="border border-top-0 border-right-0 border-left-0 border-secondary ">
                            <h5 className="text-right">
                                מוצרים בהמתנה
                        </h5>
                        </div>
                        {userCart.filter(p => p.amountOrdered < 10).length ?
                            <Table hover>
                                <tbody>
                                    {userCart.filter(p => p.amountOrdered < 10)
                                        .map(p => (
                                            <CartProductDetails key={p.id} product={p} updateReload={updateReload} userDetails={props.userDetails} incomplete />
                                        ))}
                                </tbody>
                            </Table>
                            :
                            <div className="mb-5">אין הזמנות ממתינות</div>}

                        {/* View all products whose purchase group has been completed */}
                        <div className="row border border-top-0 border-right-0 border-left-0 border-secondary mt-5">
                            <h5 className="text-right col-10">
                                מכירות שנסגרו
                        </h5>
                            {completeProducts.length ? <NavLink className="btn btn-light float-left " to={`/complete-order/?userEmail=${props.userDetails.email}&total=${total}&products=${pathParams}`}>
                                <h6> מעבר לתשלום</h6>
                            </NavLink> : ""}

                        </div>
                        {completeProducts.length
                            ?
                            <><Table hover>
                                <tbody>
                                    {completeProducts.map(p => (
                                        <CartProductDetails key={p.id} product={p} updateReload={updateReload} complete />
                                    ))}
                                </tbody>
                            </Table>
                            </>

                            :
                            <div className="mb-5">אין הזמנות שהושלמו</div>}
                    </>
                        :
                        <p>טוען נתונים...</p>}
                </div>
            </div> : 
            <Error show={error} onHide={handleClose} errorMess="עליך להתחבר כדי להציג את העגלה שלך" />

        }
    </>)
}