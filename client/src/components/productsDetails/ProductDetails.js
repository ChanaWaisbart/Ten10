/**
 * Display the product details card, and provide the option of a quick purchase or transfer to additional details
 */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import addToCart from './addToCart'

export default (props) => {

    const [nextPath, setNextPath] = useState("/")

    useEffect(() => {
        props.userDetails ?
            setNextPath(`/productsList/product-details/?productName=${props.product.productName}&productDetails=${props.product.productDetails}&productImage=${props.product.productImage}&amountOrdered=${props.product.amountOrdered}&price=${props.product.price}&userId=${props.userDetails.id}&id=${props.product.id}`)
            :
            setNextPath(`/productsList/product-details/?productName=${props.product.productName}&productDetails=${props.product.productDetails}&productImage=${props.product.productImage}&amountOrdered=${props.product.amountOrdered}&price=${props.product.price}&id=${props.product.id}`)

    })

    return (
        <div className="card m-3">
            <div style={{ height: 250 }}>
                <img style={{ width: 250 }} className="card-img" variant="top" src={props.product.productImage} />
            </div>
            <div className="card-body container-fluid" style={{ height: 200, maxWidth:200 }} >
                <h5 className="card-title" style={{height:100}}>
                    {props.product.productName}
                </h5>
                <h6 className="card-text">
                   
                </h6>
                <div className="btn-group" role="group" style={{ direction: 'ltr' }}>
                    <NavLink className="btn btn-outline-secondary btn-sm"
                        to={nextPath} >  לפרטים נוספים
                    </NavLink>
                    {addToCart(props.userDetails, props.product, props.updateReload)}
                </div>
            </div>
            <div className="card-footer">
                <small className="text-muted" >{`נותרו ${10 - props.product.amountOrdered} מתוך 10`}</small>
            </div>
        </div>
    )
}
