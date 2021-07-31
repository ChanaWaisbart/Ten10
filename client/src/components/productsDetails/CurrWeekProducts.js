/**
 * Displays all the products offered for sale in the current week
 */
import React, { useState, useEffect } from 'react'
import { getCurrentWeekProducts } from '../../services/ProductsServices'
import ProductDetails from './ProductDetails'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [productList, setProductsList] = useState([])

    const [reload, setReload] = useState(false)

    const updateReload = () => {
        setReload(!reload)
    }


    useEffect(() => {
        getCurrentWeekProducts().then(res => {
            setProductsList(res)
            return
        })
    }, [reload])

    return (
        <>
            <div className="container">
                <div className="row align-items-start mt-5">
                    {productList.map(p => (
                        <ProductDetails key={p.id} product={p} userDetails={props.userDetails} updateReload={updateReload} />
                    ))}
                </div>
            </div>
        </>
    )
}