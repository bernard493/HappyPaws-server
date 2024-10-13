
const router = require("express").Router();
const passport = require("../middleware/passport");


router.put("/",  passport.authenticate("jwt", { session: false }),(req,res)=>{
    // const {username , email , password} 
    res.send("update adopter avatar")
})

module.exports = router;
