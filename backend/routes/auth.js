var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.post('/login', function (req, res, next) {
  User.find({email:req.body.email, password:req.body.password}).then((user) => {
    if(user.length === 0)
      return res.status(401).end();
    else
    {
      req.session.logined = true;
      req.session.user_id = user[0]._id;
      return res.status(200).json(user[0]).end();
    }
  }).catch((err) => {
    console.log(err);
    return res.status(500).end();
  });
});

router.post('/changePW', function (req, res, next) {
  let user_id = req.session.user_id;
  User.findOneAndUpdate({_id:user_id, password:req.body.oldP}, {$set:{password:req.body.newP}}, function(err, modi) {
    if(err){
      console.log(err);
      return res.status(401).end();
    }
    if(modi === null){
      console.log(modi);
      return res.status(401).end();
    }
    console.log(modi);
    return res.status(200).end();
  });
});

router.get('/logout', function (req, res, next) {
  //로그아웃 과정
  req.session.destroy();
  res.status(200).end();
});

/* GET users listing. */
router.post('/join', function (req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  // 저장 성공시 localhost:3000으로 리다이렉트
  user.save((err) => {
    console.log(err);
    res.status(200).end();
  });
});

module.exports = router;
