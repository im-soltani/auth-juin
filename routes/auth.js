//require router from express
const router=require("express").Router()
const User=require("../models/User")
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const isAuth = require("../middlewares/isAuth");
const {
    validator,
    registerRules,
    LoginRules
}=require("../middlewares/validator")


router.post('/register', registerRules(), validator, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    // Simple Validation
    /*  if (!name || !lastName || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields!' });
    } */

    // Check for existing user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new User
    user = new User({ name, lastName, email, password });

    // Create Salt & hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace user password with hashed password
    user.password = hashedPassword;

    // Save the user
    await user.save();

    // sign user
    const payload = {
      id: user._id,
    };

    // Generate token
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: '7 days',
    });

    res.status(200).send({ msg: 'User registred with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server Error' });
  }
});
//@route POST api/auth/login
//@desc Login User
//@access Public
router.post('/login', LoginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    //simple Validation
    /* if (!email || !password) {
      return res.status(400).send({ msg: 'Please enter all fields' });
    } */

    // Check for existing user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ msg: 'Bad Credentials! email' });
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: 'Bad Credentials! password' });
    }

    // sing user
    const payload = {
      id: user._id,
    };

    // Generate token
    const token = await jwt.sign(payload, process.env.secretOrKey, {
      expiresIn: '7 days',
    });

    res.send({ msg: 'Logged in with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server Error' });
  }
});

//@route GET api/auth/user
//@desc get authentified user
//@access private
router.get("/user",isAuth,(req,res)=>{
    res.send({user:req.user})
})


module.exports=router