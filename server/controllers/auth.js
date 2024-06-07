import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const register=async(req,res)=>{
try{
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body;
      const salt=await bcryptjs.genSalt(10);
      const passwordHash=await bcryptjs.hash(password,salt)
      console.log("password hash generated successfully")
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
    console.log("creating new user")
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);

}
catch(err){
    res.status(500).json({error:err.message});
}
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });

      console.log("User exists.")
      const isMatch = await bcryptjs.compare(password, user.password);
      console.log("IsMAtch" ,isMatch)
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(`isMatch`,isMatch)
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const h=bcryptjs.genSalt(10).then((a)=>console.log(a))
console.log("hello",h)
