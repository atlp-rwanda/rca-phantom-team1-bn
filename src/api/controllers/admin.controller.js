const _ = require('lodash');
const HttpStatusCodes = require('../enums/EHttpStatusCodes');
const adminService = require('../services/admin.service');
const { verifyPassword } = require('../utils/hash-password');
const { signJwtToken } = require('../utils/jwt');

exports.login = async(req, res) => {
 const {email, password} = req.body;

 const admin = await adminService.findOne({email});
 if(!admin) return res.status(HttpStatusCodes.UNAUTHORIZED).json({success: false, message: 'Invalid credentials'})
 const isPassValid = await verifyPassword(password, admin.password);
 if(!isPassValid) return res.status(HttpStatusCodes.UNAUTHORIZED).json({success: false, message: 'Invalid credentials'})

 const data =  _.pick(admin,['id', 'email', 'roles', 'createdAt', 'updatedAt']);
 return res.status(HttpStatusCodes.OK)
 .json({
    success: true, 
    message: 'Admin Logged in successfully', 
    data,
    accessToken: signJwtToken(data)
})
}