/**
 * Displays the site registration form
 */
import React, { useState } from 'react';
import { isEmailValid, isPasswordValid, isNameValid, isPhoneValid, isAddressValid, isFormValid } from '../../../services/FormValidation'
import FormControl from '../FormControl'
import { addNewUser, checkEmailExist } from '../../../services/UserService'

export default (props) => {

    const getErrorDescription = (name, value) => {
        switch (name) {
            case "userName":
                if (!isNameValid(value)) return "שם לא תקין, עברית בלבד";
                else return "";
            case "email":
                if (!isEmailValid(value)) return "מייל לא תקין";
                else return "";
            case "password":
                if (!isPasswordValid(value)) return "סיסמה לא תקינה, מינימום שמונה תווים, לפחות אות אחת (אנגלית בלבד) ומספר אחד";
                else return "";
            case "phone":
                if (!isPhoneValid(value)) return "המספר שהוזן לא תקין";
                else return "";
            case "address":
                if (!isAddressValid(value)) return "הכתובת שהוזנה לא תקינה, עברית בלבד";
                else return "";
            default:
                return ""
        }
    }

    const [userDetails, errorValues, changeHandler, blurHandler]
        = FormControl(
            {
                userName: "",
                email: "",
                password: "",
                phone: "",
                address: ""
            },
            getErrorDescription)

    const [statusForm, setStatusForm] = useState({ status: "" })


    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid(userDetails, errorValues)) {
            setStatusForm({ status: "אחד או יותר מהפרטים שהוזנו לא תקין" })
            return
        }
        else {
            checkEmailExist(userDetails.email).then(
                res => {
                    if (res) {
                        setStatusForm({ status: "מצטערים לא הצלחנו לחבר אותך לאתר, כתובת המייל שהוזנה כבר קיימת" })
                    }
                    else {
                        addNewUser(userDetails)
                        localStorage.setItem("user", JSON.stringify({ email: userDetails.email }))
                        props.updateReload()
                        props.setShow()
                        props.history.push("/")
                    }
                }
            )

        }
    }

    return (
        <form onSubmit={handleFormSubmit} noValidate>

            {/* the name input*/}
            <div className="form-group">
                <label htmlFor="name-input">שם</label>
                <input
                    placeholder="הכנס את שמך"
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={userDetails.userName}
                    type="string"
                    name="userName"
                    className="form-control"
                    id="name-input" />
            </div>
            {
                (<small className="error-message error">{errorValues.userName}</small>)
            }

            {/* the email input*/}
            <div className="form-group">
                <label htmlFor="email-input">מייל</label>
                <input
                    placeholder="הכנס כתובת האימייל"
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={userDetails.email}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email-input" />
            </div>
            {
                (<small className="error-message error">{errorValues.email}</small>)
            }

            {/* the password input*/}
            <div className="form-group">
                <label htmlFor="password-input">סיסמה</label>
                <input
                    placeholder="הכנס את הסיסמה שלך"
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={userDetails.password}
                    type="password"
                    name="password"
                    className="form-control"
                    id="password-input" />
            </div>

            {
                (<small className="error-message error">{errorValues.password}</small>)
            }


            {/* the phone input*/}
            <div className="form-group">
                <label htmlFor="phone-input">טלפון</label>
                <input
                    placeholder="הכנס מספר טלפון"
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={userDetails.phone}
                    type="string"
                    name="phone"
                    className="form-control"
                    id="phone-input" />
            </div>
            {
                (<small className="error-message error">{errorValues.phone}</small>)
            }

            {/* the address input*/}
            <div className="form-group">
                <label htmlFor="address-input">כתובת</label>
                <input
                    placeholder="הכנס את כתובתך"
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={userDetails.address}
                    type="string"
                    name="address"
                    className="form-control"
                    id="address-input" />
            </div>
            {
                (<small className="error-message error">{errorValues.address}</small>)
            }
            {/* the submit button */}
            <div className="row mt-3">
                <p className="w-75 mr-3 ml-3" >{statusForm.status}</p>
                <div className="form-group">
                    <button type="submit" name="submit" className="btn btn-danger float-left" >
                        הרשמה
                </button>
                </div>
            </div>
        </form>
    )
}
