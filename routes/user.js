const { Router } = require('express');
const {userModel} = require('../db');
const jwt = require('jsonwebtoken')
const { JWT_USER_PASSWORD } = require('../config')
const {userMiddleware} = require('../middlewares/user');
const { purchaseModel} = require('../db')



const userRouter = Router();

    userRouter.post('/signup',async function(req,res){

        const {email, password, firstName, lastName} = req.body; //TODO: add zod validation
        //TODO: hash the password using bcrypt


        //TODOput inside a try catch block
       await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })

        res.json({
            message: "signup succeeded"
        })
    })
    
    userRouter.post('/signin',async function(req,res){

        const {email, password} = req.body;

        const user = await userModel.findOne({
            email: email,
            password: password
        });

        if(user){
           const token =  jwt.sign({
                id: user.__id
            },JWT_USER_PASSWORD);

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
    
    userRouter.get('/purchases',userMiddleware,async function(req,res){

        const userId = req.userId;
        const courseId = req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
            message: "purchases endpoint"
        })
    })


module.exports = {
    userRouter: userRouter
}