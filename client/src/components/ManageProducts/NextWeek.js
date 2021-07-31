import React, { useEffect, useState } from 'react'
import { getNextWeekProducts } from '../../services/ProductsServices'
import ProductDetailsInRow from './ProductDetailsInRow'
import { NavLink } from 'react-router-dom';
import { Table } from 'react-bootstrap'


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [nextWeekProducts, setNextWeekProducts] = useState([])
    const [reload, setReload] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const updateReload = () => setReload(!reload)


    useEffect(() => {
        getNextWeekProducts().then(products => setNextWeekProducts(products))
    }, [reload])

    return (
        <div className="container">

            <div>
                {nextWeekProducts.length ?
                    (<><div className="row mt-5">
                        <div className="col-8 border border-top-0 border-right-0 border-left-0 border-secondary ">
                            <h5 >
                                מוצרי השבוע הבא
                                </h5>

                        </div>

                    </div>
                        <div className="row">
                            <Table hover className="col-8">
                                <tbody>
                                    {nextWeekProducts.map(product => <ProductDetailsInRow key={product.id} product={product} allow="false" />)}
                                </tbody>
                            </Table>
                        </div>
                    </>)
                    : (<div className="row mt-5 ">
                        <div className="col-6 border border-top-0 border-right-0 border-left-0 border-dark">
                            עדיין לא הגדרת את מוצרי השבוע הבא
                        </div>
                        <div className="col-6">
                            <div className="row w-50 mt-4 mx-auto">
                                <NavLink to="/set-next-week">
                                    <button className="btn btn-danger">לעריכת השבוע הבא----</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div >
    )


}

