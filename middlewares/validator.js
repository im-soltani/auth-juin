const { body, validationResult } = require('express-validator');


const registerRules=()=>[
    body("name","Name is Required").notEmpty(),
    body("lastName","LastName is required").notEmpty(),
    body("email","email is required").isEmail(),
    body("password","Password  must Contain 6 characters").isLength({
        min:6,
        max:20,
    })
];
const LoginRules=()=>[
    body("email","Email is Required").isEmail(),
    body("password","Password  must Contain 6 characters").isLength({
        min:6,
        max:20,
    })
]
const validator=(req,res,next)=>{
    const errors=validationResult(req)
   if(!errors.isEmpty()){
      return res.status(401).send({
          errors:errors.array().map((el)=>({
              msg:el.msg,
          }))
      }) 
   }
   next()
}
module.exports={validator,LoginRules,registerRules}
