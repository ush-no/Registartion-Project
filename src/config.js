const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://ushnodey:login12345@login.j44rcjk.mongodb.net/?retryWrites=true&w=majority")
//check database connect or not
.then(()=>{
    console.log("mongodb connected succcessfully");
}).catch(()=>{
    console.log("Dtabase cannot connect");
})
//cretae schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

//collection part
//this model name create a collection in mongodb database with same name.

const collection = new mongoose.model("newusers", LoginSchema);
module.exports = collection;