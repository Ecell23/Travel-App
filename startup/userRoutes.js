const express = require('express');
const root = require('../routes/root/root')
const signup = require('../routes/user/signup');
const sendOtp = require('../routes/user/send_otp');
const login = require('../routes/user/login');
const verifyOtp = require('../routes/user/verify_otp');
const tripRoutes = require('../routes/trip/trip');


module.exports = function(app){
    app.use('/', root);
    app.use('/api/user/signUp',signup);
    app.use('/api/user/send_otp',sendOtp);
    app.use('/api/user/login',login);
    app.use('/api/user/verify_otp',verifyOtp);
    app.use('/api/trips', tripRoutes);
}