/**
 * includes all functions that uses the users table
 */

import { v4 as uuid } from "uuid"
import { addUserToUsersOrders } from './OrdersService'
const API_URL = "http://localhost:8080"
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
}


/**
 * return all users
 */
export const getUsers = () => {
    return fetch(`${API_URL}/users`).then(res => res.json()).then(res => res);
}

/**
 * return user by email
 */
export const getUserByEmail = (userEmail) => {
    return fetch(`${API_URL}/users?email=${userEmail}`).then(res => res.json()).then(res => res[0]);
}

/**
 * return if an email already exists
 */
export const checkEmailExist = (currentEmail) => {
    return getUsers().then(res => {
        return res.find(user => user.email === currentEmail)
    }
    ).then(res => res);
}

/**
 * return all emails of users with Ids in usersIds[]
 */
export const getUsersEmailByIds = (usersIds) => {
    return fetch(`${API_URL}/users?${usersIds.map(uId => "id=" + uId).join("&")}`)
        .then(res => res.json())
        .then(users => {
            return users.map(user => { return { "userEmail": user.email, "userName": user.userName } })
        })
}

/**
 * add new user to users table
 */
const addUserToUsers = async (userDetails) => {
    await fetch(`${API_URL}/users`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify({ id: uuid(), ...userDetails, "isManager": false })
    })
    let user = await getUserByEmail(userDetails.email)
    return user.id

}

/**
 * add new user to users table and to users' orders table
 */
export const addNewUser = async (userDetails) => {
    let id = await addUserToUsers(userDetails)
    await addUserToUsersOrders(id)
    

}

/**
 * check if password enterd match the registration password
 */
export const passwordMatch = (currentPassword, newPassword) => {
    return currentPassword === newPassword
}


/**
 * update user Details on change
 */
export const updateUserDetails = (updatedUser) => {
    return fetch(`${API_URL}/users/${updatedUser.id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify(updatedUser)
    })
}