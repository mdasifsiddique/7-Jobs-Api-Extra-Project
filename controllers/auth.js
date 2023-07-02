const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ 
    user: {
     name: user.name ,
     lastName : user.lastName,
     location : user.location, 
     token ,
     email : user.email
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ 
    user: {
     name: user.name ,
     lastName : user.lastName,
     location : user.location, 
     token ,
     email : user.email
    }
  })
}

const updateUser = async (req , resp)=>{

  const {email , lastName , name ,location} = req.body;
  if(!email || !lastName || !name || !location){
    throw new BadRequestError('Please Provide the all values')
  }

  const user = await User.findOne({_id : req.user.userId}); // we can use find one and update also
  if(!user){
    throw new UnauthenticatedError('Please provide user');
  }

  user.email = email;
  user.location = location;
  user.lastName = lastName;
  user.name = name;
  await user.save();
  const token = user.createJWT();
  resp.status(StatusCodes.OK).json({ 
    user: {
     name: user.name ,
     lastName : user.lastName,
     location : user.location, 
     token ,
     email : user.email
    }
  })
}

module.exports = {
  register,
  login,
  updateUser
}
