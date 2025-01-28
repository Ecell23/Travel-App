const nodemailer = require( 'nodemailer');
const winston = require('winston');
const config = require('config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('adminEmail'),
        pass: config.get('adminEmailPass')
    }
});

transporter.verify((error, success) => {
    if(error){
        winston.error(error);
    } else{
        winston.info('ready for messages');
    }
});

module.exports = async function sendEmail(email,otp){
    const mailoptions = {
        from: config.get('adminEmail'),
        to: email,
        subject: 'Email Verification Planit',
        text: `Your OTP is ${otp}. it will expire in 10 mins`
    };
    try{
        await transporter.sendMail(mailoptions);
        return;
    } catch (error) {
        throw error;
    }
}
