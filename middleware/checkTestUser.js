const {BadRequestError} = require('../errors');

const checkTestUser = async (req , resp , next)=>{
    if(req.user.isTestUser){
        throw new BadRequestError('Test User. Read Only')
    }
    next()
}

module.exports = checkTestUser