const express = require('express');
const router = express.Router();
const User = require('../Model/User');

const {auth} = require('../middleware/auth');


// @route  POST /users/register
// @desc   Add a user
// @access Public
router.post('/register', async(req,res)=>{

  try {

    const user = await User.create(req.body);

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token
    })
    
  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
    
  }

});


// @route  POST /users/login
// @desc   Login a user
// @access Public
router.post('/login', async(req,res)=>{


  try {

    const user = await User.findOne({name: req.body.name}).select('+password');

    if(!user){
      return res.status(404).json({
        success: false,
        msg: 'User Not Found'
      });
    }



    const isMatched = await user.matchPassword(req.body.password);

    if(!isMatched){
      return res.status(401).json({
        success: false,
        msg: 'Invalid Credentials'
      })
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token
    });
    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
    
  }
});


// @route  GET /users/admin
// @desc   Get user profile
// @access Private
router.get('/admin', auth, async(req,res)=>{
  try {

    res.status(200).json({
      success: true,
      user: req.user
    });
    
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      msg: 'Server Error'
    })
    
  }
})





module.exports = router;

