const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const ContentSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


module.exports =mongoose.model('Note',ContentSchema)