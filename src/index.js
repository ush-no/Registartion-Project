const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require("bcrypt");

const app = express();
//use ejs as view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));
//convert data into json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req,res) => {
    res.render("login");
});
app.get("/signup", (req,res) => {
    res.render("signup");
});
//register user
app.post("/signup", async(req,res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //check if user alredy exist in database
    const existUser = await collection.findOne({name: data.name});
    if(existUser) {
        res.send("User Already Exist. Please choose a different User name.");
    }
else { 
    //hash the password using bcrypt
    const saltRound = 10; //number of salt round for bcrypt
    const hashPassword = await bcrypt.hash(data.password, saltRound);
    data.password = hashPassword;// replace the hashpassword with orginal password
    
    const userdata = await collection.insertMany(data);
    console.log(userdata);
}
});
//login user
app.post("/login", async(req,res) => {

try{
  
    const check = await collection.findOne({name: req.body.username});
    if(!check) {
        res.send("User name Cannot found");
    }
        //compare the hash password from database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            req.send("Worng Password");
        }

}catch{
    console.log("Wrong Details");
}

});

const port = 5001;
app.listen(port,() => {
console.log("Servr is running on port");
})