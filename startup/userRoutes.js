const express = require('express');
const signup = require('../routes/user/signup');
const sendOtp = require('../routes/user/send_otp');

module.exports = function(app){
    app.use('/api/user/signUp',signup);
    app.use('/api/user/send_otp',sendOtp);
}