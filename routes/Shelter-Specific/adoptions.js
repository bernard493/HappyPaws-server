const router = require("express").Router();



router.get("/adoptions/requests", (req, res) => {
    res.send(" Get a list of adoption requests for the shelter");
  });
  
  router.put("/adoptions/requests/:id/approve", (req, res) => {
    res.send(" Approve an adoption request.");
  });
  
  router.put("/adoptions/requests/:id/reject", (req, res) => {
    res.send(" Reject an adoption request.");
  });
  
  

  

module.exports = router;
