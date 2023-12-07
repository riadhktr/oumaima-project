const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = require('../models/user');
const foodSchema = require('../models/food');


require('dotenv').config();

// handel register
exports.register = async(req,res)=>{
try{
   const{email,password} = req.body;
   // test 3le l existance mte3 l email 
   const exist = await userSchema.findOne({email});
   if(exist){
    return res.status(400).json({msg:"email already exist"})
   }
   // bech nabda n3amel el creation du compte
   const newUser = await new userSchema(req.body);
   // cryptage
   const saltRounds = 10;
   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password,salt); // password hashed
   // newuserSchema {name:'',email:'',password:'hashed password'}
   newUser.password = hash 
     newUser.save(); // enregistre l'objet fel database
     res.status(200).json({msg:'userSchema created',newUser})

}catch(err){
  console.log(err);
    res.status(500).json({msg:'can not create this userSchema'})
}
}





//login
exports.login= async(req,res)=>{
    try {
        const {email,password} = req.body;
        // search for email existance
        const found = await userSchema.findOne({email});
        if(!found){
            return res.status(400).json({msg:"invalid email or password"})
        }
    
        const match = await bcrypt.compare(password,found.password);
        if(!match){
            return res.status(400).json({msg:"invalid email or password"})
        }
        // w ken el pwd ta3mel match (password === found.password)
        // na3tiw el userSchema mte3na token 
         const payload = {id: found._id,email:found.email};
         const token = jwt.sign(payload,process.env.private_key);
         res.status(200).json({msg:"userSchema logged In",token,found})
    } catch (error) {
      console.log(error)
        res.status(500).json({msg:"you can not log in now"})
    }
    }

    // userSchema ya3mel rating 

    exports.rating = async (req, res) => {
      const { id } = req.user;
      
      const { star, foodId  } = req.body;
      try {
        const Food = await foodSchema.findById(foodId);
        // console.log(Food);
        let alreadyRated = Food.rate.find(
          (userId) => userId.ratedBy.toString() === id
        );
        // console.log(alreadyRated);
        if (alreadyRated) {
          const updateRating = await foodSchema.updateOne(
            {rate: { $elemMatch: alreadyRated }},
            {$set: { "rate.$.star": star}},
            {new: true}
          );
          // return res.json(updateRating)
        
        } else {
          const rateFood = await foodSchema.findByIdAndUpdate(
            foodId,
            {
              $push: {
                rate: {
                  star: star,
                 ratedBy: id,
                },
              },
            },
            {new: true}
          );
          res.json(rateFood)
        }
        
        const getallratings = await foodSchema.findById(foodId);
        let totalRating = getallratings.rate.length;
        let ratingsum = getallratings.rate
          .map((item) => item.star)
          .reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await foodSchema.findByIdAndUpdate(
          foodId,
          {totalRating: actualRating},
          { new: true }
        );
       return res.json(finalproduct);
      } catch (error) {
        console.log(error);
        res.status(500).json({msg:'can not rate this book '});
      }
      };