
const express=require('express')
const router=express.Router()
const controller = require("../controllers/user.controller");

router.get('/', controller.readUsers);
router.post('/', controller.createUser);
router.put('/:id',controller.updateUser)


module.exports=router
