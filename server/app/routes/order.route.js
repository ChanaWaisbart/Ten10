
const express=require('express')
const router=express.Router()
const controller = require("../controllers/order.controller");

router.get('/', controller.readUsersOrders);
router.post('/', controller.createUserOrder);
router.put('/:id',controller.updateUsersorders)


module.exports=router

