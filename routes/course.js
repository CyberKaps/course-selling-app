const { Router } = require('express')
const {userMiddelware} = require('../middlewares/user')
const {purchaseModel} = require('../db')

const courseRouter = Router();




courseRouter.post('/purchase',userMiddelware,async function(req,res){
    const userId = req.userId;
        const courseId = req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
            message: "You have successfully bought the course"
        })
})

courseRouter.get('/preview',async function(req,res){
    res.json({
        message: "courses endpoint"
    })
})


module.exports = {
    courseRouter: courseRouter
}