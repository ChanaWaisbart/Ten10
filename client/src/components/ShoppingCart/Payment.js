/**
 * Making the payment on PayPal
 */
import React from 'react'
import PayPal from '../../services/PayPal/PayPal'
import {updateUserPaid} from '../../services/OrdersService'


export default (props) => {


const onSuccess = () => {
    let productIds = props.productIds.map(pId => parseInt(pId))
    updateUserPaid(props.userId, productIds)
}



    return (
        <div>
            <h5>{`סה"כ לתשלום-  ${props.total} ₪`}</h5>
            <button className="btn" onClick={onSuccess}>עדכון סל קניות</button>
            <PayPal total={props.total} onSuccess={onSuccess} />

        </div>
    )


}