/**
 * Displays product details in a shopping cart view
 */
import React from 'react'
import { updateUserCart, updateProductOrders } from '../../services/OrdersService'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const cancelOrder = async () => {
        let product = {
            amountOrdered: parseInt(props.product.amountOrdered),
            id: parseInt(props.product.id),
            price: parseInt(props.product.price),
            productName: props.product.productName,
            productImage: props.product.productImage,
            productDetails: props.product.productDetails
        }
        await updateUserCart(props.userDetails.id, parseInt(props.product.id), -1)
        await updateProductOrders(product, -1)
        props.updateReload()
    }


    return (
        <tr>

            <td style={{ maxWidth: 200 }}><img style={{ width: 150 }} src={props.product.productImage} alt="product-img"/></td>
            <td className="text-right">
                <div className="row">{props.product.amount} x {props.product.productName}</div>
                <div className="row">מחיר {props.product.price}</div>
            </td>
            <td colSpan="2" style={{ width: 200 }}></td>
            <td >
                <div className="row">סה"כ {props.product.price * props.product.amount} ש"ח</div>

                {props.incomplete && <div className="row"><button className="btn" onClick={cancelOrder}>
                    הסרת פריט  <i className="bi bi-x"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></i>
                </button> </div>}
            </td>
        </tr >
    )
}
