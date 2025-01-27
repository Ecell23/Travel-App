const express = require('express');
const signup = require('../routes/user/signup');
const sendOtp = require('../routes/user/send_otp');
const verifyOtp = require('../routes/user/verify_otp');

module.exports = function(app){
    app.use('/api/user/signUp',signup);
    app.use('/api/user/send_otp',sendOtp);
    app.use('/api/user/verify_otp',verifyOtp);
}