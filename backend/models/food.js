const mongoose = require ("mongoose")

// houni dima type mte3 ay data yabda par majiscule kima String wella Number

const foodSchema = new mongoose.Schema({
   
    title: {
        type:String , 
        required:true
    },
    description :{
        type:String ,
         required:true
    },
    image : {
        type:String , 
        required:true
    },
    price:{
        type: Number,
        required:true
    },    
    rate : [{
        star : Number ,
        ratedBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'  //nom du model
        }
    }],
    totalRating : {
        type :Number,
        default:0 
    } 
    })

    // l'export mongoose.model mech mongoose.module 
    // khater enti houni t7eb tasna3 des documents fel database mba3ed à partir men les models li 3endek
    // module na7kiw 3le fonction javaScript 

module.exports = mongoose.model("Pizaria",foodSchema)