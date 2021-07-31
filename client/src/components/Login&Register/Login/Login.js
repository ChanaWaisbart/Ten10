/**
 * Displays the site login form
 */
import React, { useState } from 'react';
import { isEmailValid, isPasswordValid, isFormValid } from '../../../services/FormValidation'
import FormControl from '../FormControl'
import { checkEmailExist, passwordMatch } from '../../../services/UserService'


export default (props) => {

    const getErrorDescription = (name, value) => {
        switch (name) {
            case "email":
                if (!isEmailValid(value)) return "מייל לא תקין";
                else return "";
            case "password":
                if (!isPasswordValid(value)) return "מינימום שמונה תווים, לפחות אות אנגלית אחת ומספר אחד, ללא תוים מיוחדים";
                else return "";
            default:
                return ""
        }
    }

    const [userDetails, errorValues, changeHandler, blurHandler]
        = FormControl({ email: "", password: "" }, getErrorDescription)

    const [statusForm, setStatusForm] = useState({ status: "" })

    const switchForm = (event) => {
        event.preventDefault()
        props.switch()
    }

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
                        if (passwordMatch(res.password, userDetails.password)) {
                            localStorage.setItem("user", JSON.stringify({ email: userDetails.email }))
                            props.updateReload()
                            props.setShow();
                            props.history.push("/")
                        }
                        else {
                            setStatusForm({ status: "מצטערים לא הצלחנו לחבר אותך לאתר, הסיסמה שהוזנה שגויה" })
                        }
                    }
                    else {
                        setStatusForm({ status: "מצטערים לא הצלחנו לחבר אותך לאתר, בדוק שפרטי ההתחברות שלך נכונים ונסה שנית" })
                    }
                }
            )
        }
    }

    return (
        <form onSubmit={handleFormSubmit} noValidate>

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

            {/* the submit button */}
            <div className="row mt-3">
                <p className="w-75 mr-3 ml-3" >{statusForm.status}</p>
                <div className="form-group">
                    <button type="submit" name="submit" className="btn btn-danger float-left" >
                        כניסה
                </button>
                </div>
            </div>
            <div className="row mr-2 ">
                <div className="align-text-top"> פעם ראשונה שלך כאן?</div>
                <button className="btn mr-n1 mt-n1" onClick={switchForm}><div className="">להרשמה</div></button>
            </div>
        </form>
    )
}
