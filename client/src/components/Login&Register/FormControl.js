/**
 * Form management hook
 */
import { useEffect, useState } from 'react';
import { isEmpty } from '../../services/FormValidation'

export default (initialDetails, getErrorDescription) => {


    const [userDetails, setUserDetails] = useState(initialDetails)
    const [errorValues, setErrorValues] = useState(initialDetails)

    useEffect(() => {
        setUserDetails(initialDetails)
    }, [Object.values(initialDetails)[0] !== ""])


    const changeHandler = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        })
    }

    const blurHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let errDesc = "";
        if (isEmpty(value)) {
            errDesc = "שדה חובה"
            setErrorValues({ ...errorValues, [name]: errDesc });
            return
        }
        errDesc = getErrorDescription(name, value)
        setErrorValues({ ...errorValues, [name]: errDesc });
        return
    }

    return [
        userDetails,
        errorValues,
        changeHandler,
        blurHandler
    ]
}