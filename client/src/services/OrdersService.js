import { v4 as uuid } from "uuid";
import {getProductById, productOrdersCompletetd} from './ProductsServices';
import { sendEmail } from './SendEmail/SendEmail';
import { getUsersEmailByIds } from './UserService';
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
}


const API_URL = "http://localhost:8080"
/**
 * return {id:**, userId:**, orders:[{id:**, proId:**, amount:**}, {id:**, proId:**, amount:**}]}
 */
const getUserCart = async (userId) => {
    return fetch(`${API_URL}/usersOrders?userId=${userId}`)
    .then(res => res.json())
    .then(res => {
        return res[0]
    })

}


/**
 * return the product details that the user ordered
 */
export const getUserOrdersProducts = async (userId) => {
    let ordersDetails = [];
    let orders = await getUserCart(userId);
    orders = orders.orders;
    if (!orders.length) return []
    else {
        for (let i = 0; i < orders.length; i++) {
            let product = await getProductById(orders[i].productId)
            product = product[0]
            ordersDetails.push({
                ...orders[i], ...product
            })
        }
        return ordersDetails
    }
}

/**
 * return the updated array of orders []
 */
const getUpdatedUserCart = (userCart, productId, amountAdd) => {
    let newCart = []
    let productOrder = userCart.find(order => order.productId === productId)
    if (productOrder) {
        if (productOrder.amount + amountAdd === 0) {
            newCart = userCart.filter(order => order.productId !== productId)
        }
        else {
            newCart = userCart.filter(order => order.productId !== productId)
            newCart.push({ id: productOrder.id, productId, amount: amountAdd + productOrder.amount })
        }
    }
    else {
        newCart = [...userCart, { id: uuid(), productId, amount: amountAdd }]
    }
    return newCart
}


/**
 * update the user cart if user added a product
 */
export const updateUserCart = (userId, productId, amountAdd) => {
    let id;
    return getUserCart(userId).then(userCart => {
        id = userCart.id
        return getUpdatedUserCart(userCart.orders, productId, amountAdd)
    }).then(updatedCart => {
        return fetch(`${API_URL}/usersOrders/${id}`, {
            headers: API_HEADERS,
            method: "PUT",
            body: JSON.stringify({ id, userId: userId, orders: updatedCart })
        })
            .then((res) => res.json())
    }
    )
}

export const updateProductOrders = async (product, amountAdd) => {
    let amount = product.amountOrdered + amountAdd
    await fetch(`${API_URL}/currentWeekProducts/${product.id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify({ ...product, amountOrdered: amount })
    })
    if (amountAdd > 0) {
        let ordersCompleted = await productOrdersCompletetd(product.id)
        if (ordersCompleted) {
            //update all users who ordered this product, that product ordering is completed, by sending them an email.
            updateUsersOrderCompleted(product)
        }
    }
}

const userOrderProduct = (productId, userOrders) => {
    if (userOrders.orders.find(order => order.productId === productId)) {
        return true
    }
    else return false
}

const getUsersOrders = () => {
    return fetch(`${API_URL}/usersOrders`)
        .then(res => res.json())
}


/**
 * return all users that ordered product : 'productId'
 */
const usersOrderedProduct = (productId) => {
    let orders = [];
    return getUsersOrders().then(usersOrders => {
        orders = usersOrders.filter(userOrders => userOrderProduct(productId, userOrders))
        return orders
    })
}

export const productOrderUpdate = (userId, product, amountAdd) => {
    return updateUserCart(userId, parseInt(product.id), amountAdd).then(updateProductOrders(product, amountAdd))
}




/**
 * return email of users that ordered product: 'productId'
 */
const getUsersEmailOrderedProduct = (productId) => {
    return usersOrderedProduct(productId)
        .then(usersOrders => usersOrders.map(userOrders => userOrders.userId)
        )
        .then(userIds => {
            return getUsersEmailByIds(userIds)
        })
}



const updateUsersOrderCompleted = async (product) => {
    let users = await getUsersEmailOrderedProduct(product.id)
    // eslint-disable-next-line array-callback-return
    users.map(user => {
        let message = `שלום ${user.userName}, ברכותינו!!!.
        התבצעו 10 הזמנות של ה${product.productName} עליכם להכנס לאתר להשלים את ההזמנה. `
        sendEmail(user.userName, user.userEmail, message)
    })
}

const getCartAfterPayment = async (userId, productsIds) => {
    let userCart = await getUserCart(userId)
    let orders = userCart.orders.filter(order => !(productsIds.includes(order.productId)))
    return [userCart.id, orders]
}

export const updateUserPaid = async (userId, productsIds) => {
    let [id, newCart] = await getCartAfterPayment(userId, productsIds)
    return await fetch(`${API_URL}/usersOrders/${id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify({ id, userId, orders: newCart })
    })

}

export const addUserToUsersOrders = (userId) => {
    return fetch(`${API_URL}/usersOrders`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify({ id: uuid(), userId, orders: [] })
    })
        .then((res) => res.json())
}

const updateUserCartInNewWeek = async (userCart) => {
    let updatedOrders = []
    for (let i = 0; i < userCart.orders.length; i++) {
        let isCompleted = await productOrdersCompletetd(userCart.orders[i].productId)
        if (isCompleted) {
            updatedOrders.push(userCart.orders[i])
        }
    }
    return fetch(`${API_URL}/usersOrders/${userCart.id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify({ id: userCart.id, userId: userCart.userId, orders: updatedOrders })
    })
}


export const updateOrdersInNewWeek = async () => {
    let usersOrders = await getUsersOrders()
    for (let i = 0; i < usersOrders.length; i++) {
        await updateUserCartInNewWeek(usersOrders[i])
    }
}