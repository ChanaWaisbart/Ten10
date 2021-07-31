
const express=require('express')
const router=express.Router()
const controller = require("../controllers/sellDeadline.controller");

router.get('/', controller.readDeadline);
router.put('/:id',controller.updateDeadline)


module.exports=router
