
const express=require('express')
const router=express.Router()
const controller = require("../controllers/currWeek.controller");

router.get('/', controller.readProducts);
router.delete('/:id', controller.deleteProducts);
router.post('/', controller.createProducts);
router.put('/:id',controller.updateProducts)


module.exports=router
