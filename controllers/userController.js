const users = require("../models/userModel");
const jwt = require('jsonwebtoken')

// register logic
exports.registerController = async (req, res) => {
  console.log("Inside register Function");
  const { username, email, password } = req.body;
  console.log(username, email, password);

  //   res.status(200).json("Request recived");

  try {
    // email is in mangoDb users
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      // Aldready a user
      res.status(406).json("Account already exits!! Please Login...");
    } 
  } catch (err) {
    res.status(401).json(err);
  }
};

//login

exports.loginController = async (req,res) => {
  console.log("Inside login function");
  const {email,password} = req.body
  console.log(email,password);
  try{
    const existingUser = await users.findOne({email,password})
    if(existingUser){
      //token generate
      const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
       res.status(200).json({
        user:existingUser,
        token
    })
    }else{
      res.status(404).json("Invalid Email / Password...")
    }
  }catch{
    res.status(401).json(err)
  }
}


