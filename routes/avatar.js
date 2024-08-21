
const router = require("express").Router();

router.put("/", (req,res)=>{
    // const {username , email , password} 
    res.send("update adopter avatar")
})

module.exports = router;
