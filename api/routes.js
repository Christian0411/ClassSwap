var express = require('express');
var router = express.Router();

var api = require('./internalApi.js');


router.get('/api/getStudentInfo', function(req,res)
{
  api.getStudentInfo()
  .then(data => {
    res.send(JSON.stringify(data,null,4));
  })
  .catch(err=>{res.send({error:err})});
});

router.post('/api/login', function(req,res)
{  
  api.login(req.body.username, req.body.pass)
  .then(data => {
    res.send(JSON.stringify(data,null,4));
  })
  .catch(err=>{res.send({error:err})});
});


module.exports = router;
