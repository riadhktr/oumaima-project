const express = require ("express");
const foodSchema = require('../models/food');
const { upload } = require("../middelwares/uploadFiles");
const { isAuth } = require("../middelwares/isAuth");
const foodRouter = express.Router()
upload

// houni zedtek un middelware lel upload image mte3 el produit 
// elli houwa upload mawjoud fel dossier middelwares
foodRouter.post('/create',isAuth,upload.single('img'),(req,res)=>{
    const {title,description,price,rate}=req.body;
    const Poster = req.file.filename;
    
    const newfood = new foodSchema({title,description,price,rate,image:Poster});
    newfood.save()
    .then((rslt)=>{
        res.status(200).json({msg : "food create",rslt})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({msg : 'error'})
    })
})
//get all food 

foodRouter.get('/foodList',(req,res)=>{
    foodSchema.find({})
    .then((rslt)=>{
        res.status(200).json({msg : "total food list ",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
})


//get food by Id 

foodRouter.get('/get/:id',(req,res)=>{
    const {id}=req.params;
    foodSchema.findById({_id:id})
    .then((rslt)=>{
        res.status(200).json({msg : "food selected with success",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
})

//upDate food by id 

foodRouter.put('/upDatefood/:id',isAuth,(req,res)=>{
   const {id}=req.params ;
   const {title,description,price,rate}=req.body;
   
    foodSchema.findByIdAndUpdate({_id:id},{title,description,price,rate})
    .then((rslt)=>{
        res.status(200).json({msg : "food upDate",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
}
)


//delete food  by id 
foodRouter.delete('/delete/:id',isAuth,(req,res)=>{
    const {id}=req.params;
    foodSchema.deleteOne({_id:id})
    .then((rslt)=>{
        res.status(200).json({msg : "food delete with success",rslt})

    })
    .catch((err)=>{
       res.status(500).json({err})
    })
})







module.exports = foodRouter