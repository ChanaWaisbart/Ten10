import React, { useEffect, useState } from 'react';

export default (props) => {

    const [selected, setSelected] = useState(false)

    const updateSelect = () => setSelected(!selected)

    const slectedIcon = (
        <i className="bi bi-check-circle-fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
        </i>
    )
    const notSelectedIcon = (
        <i className="bi bi-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            </svg>
        </i>
    )

    const addProduct = (product) => {
        if (props.addProductSelected) {
            let success = props.addProductSelected(product, selected)
            if(success === "completed"){
                return
            }
            if (success) {
                localStorage.setItem(`${product.id}`, "selected")
            }
            else {
                localStorage.removeItem(`${product.id}`)
            }
            updateSelect()
        }
    }

    useEffect(() => {
        if (localStorage.getItem(props.product.id)) {
            if (props.addProductSelected) {
                props.addProductSelected(props.product)
                setSelected(true)
            }
        }
    }, [])

    return (
        <tr className="w-100">
            <button className="btn btn-lg" onClick={() => { addProduct(props.product) }}>
                <td >
                    {props.addProductSelected ? (
                        selected ? slectedIcon : notSelectedIcon
                    ) : ""
                    }
                </td>
                <td>
                    <img style={{ width: 100 }} className="" src={props.product.productImage} />
                </td>
                <td style={{ minWidth: 200 }}>
                    <h5 className="">{props.product.productName}</h5>
                </td>
                <td>
                    {`מחיר- ${props.product.price}`}
                </td>
            </button>
        </tr>
    )
}