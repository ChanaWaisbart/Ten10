/**
 * show all products in db
 * each product in <li>
 * 
 */

import React, { useEffect, useState } from 'react';
import { getProductsList, updateWeekProducts} from '../../services/ProductsServices'
import ProductDetailsInRow from './ProductDetailsInRow'
import { Table } from 'react-bootstrap'


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [productsList, setProductsList] = useState([])//holds all products in db
    const [productSelected, setProductSelected] = useState([])//holds products selected for next week
    const [statusSelected, setStatusSelected] = useState("עדיין לא נבחרו מוצרים")
    const [complete, setComplete] = useState(false)


    useEffect(() => {
        if (productSelected.length) {
            setStatusSelected(`נבחרו ${productSelected.length} מוצרים`)
        }
        getProductsList().then(products => setProductsList(products))
    }, [productSelected.length, statusSelected])



    const addProductSelected = (newProduct, selcted) => {
        if (selcted) {
            let updateSelected = productSelected.filter(p => p.id !== newProduct.id)
            setProductSelected(updateSelected)
            if (productSelected.length > 1) setStatusSelected(`נבחרו ${productSelected.length - 1} מוצרים`)
            else setStatusSelected("המוצרים שנבחרו")
            return false
        }
        else {
            if (productSelected?.length < 10) {
                setProductSelected(prev => ([
                    ...prev,
                    newProduct
                ]));
                setStatusSelected(`נבחרו ${productSelected.length + 1} מוצרים`)
                return true
            }
            else {
                setStatusSelected("ניתן לבחור עד 10 מוצרים")
                return "completed"
            }
        }
    }




    const setNextWeekProducts = () => {
        updateWeekProducts("nextWeek", productSelected).then(
            productSelected.map(product => localStorage.removeItem(`${product.id}`)),
            setProductSelected([]),
            setStatusSelected("מוצרי השבוע הבא התעדכנו בהצלחה"),
            setComplete(true),
            props.updateReload(),
            setTimeout(props.history.push("/next-week"), 2000)
            
        )
    }


    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    {!complete ? <><div className="col-6">
                        <div className="border border-top-0 border-right-0 border-left-0 border-secondary ">
                            <h5 >
                                בחר 10 מוצרים
                                 </h5>
                        </div>
                        <Table hover>
                            <tbody>
                                {productsList.map(product => <div key={product.id}><ProductDetailsInRow key={product.id} product={product} addProductSelected={addProductSelected} /></div>)}
                            </tbody>
                        </Table>
                    </div>
                        <div className="col-2"></div>
                        <div className="col-4">
                            <div className="row">
                                <div >
                                    <div className="border border-top-0 border-right-0 border-left-0 border-secondary ">
                                        <h5 >
                                            המוצרים שנבחרו
                                         </h5>
                                    </div>
                                    <small>{statusSelected}</small>
                                    {productSelected.length === 10 ? <button className="btn btn-outlined-secondary mr-5" onClick={() => { setNextWeekProducts() }}>לסגור את השבוע הבא?</button> : ""}
                                </div>
                            </div>
                            <Table hover>
                                <tbody>
                                    {productSelected.map(product => <ProductDetailsInRow key={product.id} product={product} />)}
                                </tbody>
                            </Table>
                        </div></> :
                        <div className="border border-top-0 border-right-0 border-left-0 border-secondary ">
                            <h5 >
                                {statusSelected}
                            </h5>
                            { }
                        </div>}
                </div>
            </div>
        </>
    )

}