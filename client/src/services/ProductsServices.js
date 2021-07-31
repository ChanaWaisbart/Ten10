/**
 * includes all functions that uses the Products table
 */

 const API_URL = "http://localhost:8080";
 const API_HEADERS = {
     "Content-Type": "application/json",
     Accept: "application/json",
 }
 
 
 /**
  * return all product in ${week}Products list
  */
 export const getWeekProducts = (week) => {
     return fetch(`${API_URL}/${week}Products`).then(res => res.json())
         .then(res => res);
 }
 
 /**
  * return products of current week
  */
 export const getCurrentWeekProducts = () => {
     return getWeekProducts("currentWeek")
 }
 
 /**
  * return next week products
  */
 export const getNextWeekProducts = () => {
     return getWeekProducts("nextWeek")
 }
 
 /**
  * return product by its id
  */
 export const getProductById = async (productId) => {
     return fetch(`${API_URL}/currentWeekProducts?id=${productId}`).then(res => res.json()).then(res => {
         return res
     })
 }
 
 /**
  * get the amount ordered from product
  */
 export const getProductAmountOrdered = async (productId) => {
     let product = await getProductById(productId)
     return product[0].amountOrdered
 }
 
 /**
  * get all ids of `week` products
  */
 export const getWeekProductsIds = (week) => {
     return getWeekProducts(week).then(products => {
         if (products.lenght === 0) return []
         return products.map(product => product.id)
     })
 }
 
 /**
  * return all products 
  */
 export const getProductsList = () => {
     return fetch(`${API_URL}/products`)
         .then(res => res.json()).then(res => res)
 }
 
 /**
  * delete product by its id
  */
 export const deleteProductById = (week, productId) => {
     return fetch(`${API_URL}/${week}Products/${productId}`, {
         method: "DELETE",
     })
 }
 
 /**
  * delete all product in `week`
  */
 export const deleteWeekProducts = async (week) => {
     let weekProductsIds = await getWeekProductsIds(week)
     if (weekProductsIds.length) {
         for (let i = 0; i < weekProductsIds.length; i++) {
             await deleteProductById(week, weekProductsIds[i])
         }
     }
 }
 
 /**
  * set new product in `week` products list
  */
 export const setNewProduct = (week, newProduct) => {
     return fetch(`${API_URL}/${week}Products`, {
         headers: API_HEADERS,
         method: "POST",
         body: JSON.stringify(newProduct)
     })
         .then((res) => res.json())
 }
 /**
  * set week with new products
  */
 const setWeekProducts = async (week, newProducts) => {
     for (let i = 0; i < newProducts.length; i++) {
         await setNewProduct(week, newProducts[i])
 
     }
 }
 
 /**
  * delete week products and then set with new products
  */
 export const updateWeekProducts = async (week, newProducts) => {
     await deleteWeekProducts(week);
     await setWeekProducts(week, newProducts)
     return
 }
 
 /**
  * check if amount ordered of product is 10
  */
 export const productOrdersCompletetd = async (productId) => {
     let amountOrdered = await getProductAmountOrdered(productId)
     return amountOrdered === 10
 }
 
 /**
  * check if user alowed to add product
  */
 export const productOrderConfirmation = (productName) => {
     return fetch(`${API_URL}/currentWeekProducts?productName=${productName}`)
         .then(res => res.json())
         .then(product => product[0].amountOrdered < 10)
 }
 