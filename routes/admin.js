const {Router} = require('express')

const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require('jsonwebtoken')
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require('../middlewares/admin');

adminRouter.post('/signup',async function(req,res){
    
    const {email, password, firstName, lastName} = req.body; //TODO: add zod validation
    //TODO: hash the password using bcrypt


    //TODOput inside a try catch block
   await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "signup succeeded"
    })

})

adminRouter.post('/signin',async function(req,res){
    const {email, password} = req.body;

        const admin = await adminModel.findOne({
            email: email,
            password: password
        });

        if(admin){
           const token =  jwt.sign({
                id: admin.__id
            },JWT_ADMIN_PASSWORD);

            //Do coockie logic

            res.json({
                token: token
            })
        } else{
            res.status(403).json({
                message: "incorrect credentials"
            })
        }

})

adminRouter.post('/course',adminMiddleware,async function(req,res){
    const adminId = req.adminId

    const { title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId:adminId
    })

    res.json({
        message: "Course created",
        courseId: course.id
    })
})

adminRouter.put('/course',adminMiddleware,async function(req,res){

     const adminId = req.adminId

    const { title, description, imageUrl, price} = req.body;


    const course = await courseModel.updateOne({
        __id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId:adminId
    })

    res.json({
        message: "Course updated",
        courseId: course.id
    })
})

adminRouter.get('/course/bulk',adminMiddleware,async function(req,res){


    const adminId = req.adminId

    const { title, description, imageUrl, price} = req.body;


    const course = await courseModel.findone({
        __id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course bulk",
        courseId: course.id
    })
})

module.exports = {
    adminRouter: adminRouter
}