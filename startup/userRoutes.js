const express = require('express');
const signup = require('../routes/user/signup');
const sendOtp = require('../routes/user/send_otp');
const login = require('../routes/user/login');

module.exports = function(app){
    app.use('/api/user/signUp',signup);
    app.use('/api/user/send_otp',sendOtp);
    app.use('/api/user/login',login);
}