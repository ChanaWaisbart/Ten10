//Return true if the value is empty, false otherwise;
export const isEmpty = (value) => {
    if (String(value).length === 0) {
        return true;
    }
    return false;
}

//return true if the email-input is valid
export const isEmailValid = (email) => {
    var mailFormat = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if (mailFormat.test(email)) {
        return true
    }
    return false
}

//return true if the password-input is valid
export const isPasswordValid = (password) => {
    var passwordFormat = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    if (passwordFormat.test(password)) {
        return true
    }
    return false
}

//return true if the name-input is valid
export const isNameValid = (name) => {
    var lettersFormat = RegExp(/^[א-ת ]+$/);
    for (let i in name) {
        if (!name[i].match(lettersFormat)) {
            return false;
        }
    }
    return true
}

//return true if the address-input is valid
export const isAddressValid = (address) => {
    var lettersFormat = RegExp(/^[א-ת0-9 ]+$/);
    for (let i in address) {
        if (!address[i].match(lettersFormat)) {
            return false;
        }
    }
    return true
}

//return true if the phone-input is valid
export const isPhoneValid = (phone) => {
    var phoneFormat = RegExp(/^[0]+?(([23489]{1}\d{7})|[57]{1}\d{8})$/)
    if (phoneFormat.test(phone)) {
        return true
    }
    return false
}

//return true if the form is valid - if all the error fields are empty
export const isFormValid = (formValues, errorValues) => {
    for (const value of Object.values(errorValues)) {
        if (!isEmpty(value)) {
            return false;
        }
    }
    for (const value of Object.values(formValues)) {
        if (isEmpty(value)) {
            return false;
        }
    }
    return true;
}
