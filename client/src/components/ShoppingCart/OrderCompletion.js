/**
 * Presenting the order completion form and making the payment
 */
import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { getUserByEmail, updateUserDetails } from '../../services/UserService'
import { isPhoneValid, isAddressValid, isFormValid } from '../../services/FormValidation'
import FormControl from '../Login&Register/FormControl'
import Payment from './Payment'


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const [userDetails, setUserDetails] = useState(null)
    const [total, setTotal] = useState(0)
    const [products, setProducts] = useState("")
    const [delivryDetails, setDeliveryDetails] = useState({ phone: "", city: "", street: "", streetNum: "" })
    const [display, setDisplay] = useState({ changeDetails: false, payment: false })
    const [statusForm, setStatusForm] = useState({ status: "" })

    const changeDetails = (event) => {
        event.preventDefault();
        setDisplay({ changeDetails: true, payment: false })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid(details, errorValues)) {
            setStatusForm({ status: "אחד או יותר מהפרטים שהוזנו לא תקין" })
            return
        }
        else {
            setStatusForm({ status: "" })
            updateUserDetails({ ...userDetails, ...details }).then(
                setDisplay({ changeDetails: false, payment: true })
            )
        }
    }

    const getErrorDescription = (name, value) => {
        switch (name) {
            case "phone":
                if (!isPhoneValid(value)) return "ערך לא תקין";
                else return "";
            case "city":
            case "street":
                if (!isAddressValid(value)) return "ערך לא תקין";
                else return "";
            case "streetNum":
                if (isNaN(value)) return "ערך לא תקין";
                else return "";
            default:
                return ""
        }
    }

    useEffect(() => {
        let details = queryString.parse(props.location.search)
        setTotal(details.total)
        setProducts(details.products.split(", "))
        getUserByEmail(details.userEmail).then(
            user => {
                setUserDetails(user)
                if (user.city) {
                    setDeliveryDetails({
                        phone: user.phone,
                        city: user.city,
                        street: user.street,
                        streetNum: user.streetNum
                    })
                }
                else {
                    setDisplay({ changeDetails: true, payment: false })
                }
            }
        )
    }, [display, props.location.search])

    const [details, errorValues, changeHandler, blurHandler]
        = FormControl(
            delivryDetails,
            getErrorDescription)

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6 pl-5 pr-2 " style={{ borderLeftStyle: 'groove' }}>
                    <div className="border border-top-0 border-right-0 border-left-0 border-secondary mb-4">
                        <h4>
                            פרטי משלוח
                                 </h4>
                    </div>
                    <form  >
                        <div className="form-floating field 1">
                            <input disabled={!display.changeDetails} placeholder="מספר טלפון" type="string" name="phone" className="form-control" id="floatingInput"
                                onChange={changeHandler} onBlur={blurHandler} value={details.phone} />
                            <label htmlFor="floatingInput">טלפון</label>
                        </div>
                        {
                            (<small className="error-message error">{errorValues.phone}</small>)
                        }
                        <div className="form-floating">
                            <input disabled={!display.changeDetails} placeholder="עיר" onChange={changeHandler} onBlur={blurHandler} value={details.city} type="string" name="city" className="form-control" id="address-input" />
                            <label htmlFor="address-input">עיר</label>
                        </div>
                        {
                            (<small className="error-message error">{errorValues.city}</small>)
                        }
                        <div className="form-floating">
                            <input disabled={!display.changeDetails} placeholder="רחוב" type="string" name="street" className="form-control" id="street-input"
                                onChange={changeHandler} onBlur={blurHandler} value={details.street} />
                            <label htmlFor="street-input">רחוב </label>

                        </div>
                        {
                            (<small className="error-message error">{errorValues.street}</small>)
                        }
                        <div className="form-floating"> <input disabled={!display.changeDetails} placeholder="מספר רחוב" type="string" name="streetNum" className="form-control" id="streetNum-input"
                            onChange={changeHandler} onBlur={blurHandler} value={details.streetNum} />
                            <label htmlFor="streetNum-input">מס' רחוב</label>

                        </div>
                        {
                            (<small className="error-message error">{errorValues.streetNum}</small>)
                        }
                        {/* the submit button */}
                        <div >
                            <button onClick={changeDetails} className="btn btn-sm row" style={{ float: 'right' }}>
                                עדכון פרטי משלוח
                   </button>
                            <button onClick={handleSubmit} className="btn btn-secondary" style={{ float: 'left' }} >
                                אישור
                   </button>
                        </div>

                        <p>{statusForm.status}</p>
                    </form>

                </div>
                <div className="col-6">
                    {display.payment &&
                        <Payment total={total} userId={userDetails.id} productIds={products} />}

                </div>

            </div >
        </div>
    )

}
