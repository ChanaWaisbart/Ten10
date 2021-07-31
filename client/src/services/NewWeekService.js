import { updateOrdersInNewWeek } from './OrdersService'
import { updateWeekProducts, getWeekProducts } from './ProductsServices'
const API_URL = "http://localhost:8080";
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
}

export const dayDiffRangeWeek = (deadline, current) => {
    const diffInMs = new Date(deadline) - new Date(current)
    return diffInMs
}


const updateSellStartDate = (nextWeek) => {
    return fetch(`${API_URL}/sellStartDate/1`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify({ id: 1, date: nextWeek })
    })
}

export const getDeadline = () => {
    return fetch(`${API_URL}/sellStartDate`)
        .then(res => res.json())
        .then(date => date[0].date)
}


export const getNextWeekDate = () => {
    let nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    return nextWeek
}


export const setNewWeek = async () => {
    await updateOrdersInNewWeek()
    let nextWeekProducts = await getWeekProducts("nextWeek")
    await updateWeekProducts("currentWeek", nextWeekProducts)
    let nextWeek = getNextWeekDate()
    updateSellStartDate(nextWeek)
    return true;
}