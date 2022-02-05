var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT = require('./JWTVerify');


/* GET users listing. */
router.get('/', JWT.JWTVerify ,function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  const Users = require('../database/models/Users')
  const user = await Users.findOne({
    where: { email: req.body.email}
  });

  if(user === null){
    return res.status(500).json({message: 'Login inválido!'});
  }

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if(result){
      const uuid = user.uuid; //esse id viria do banco de dados
      const token = jwt.sign({ uuid }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }else{
      return res.status(500).json({message: 'Login inválido!'});
    }
  });
});


module.exports = router;
