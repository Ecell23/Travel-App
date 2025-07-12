// const nodemailer = require('nodemailer');
// const winston = require('winston');
// const config = require('config');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   config.get('clientId'),
//   config.get('clientSecret'),
//   "https://developers.google.com/oauthplayground"
// );

// oauth2Client.setCredentials({
//   refresh_token: config.get('refreshToken'),
// });

// let transporter = null;

// (async () => {
//   try {
//     const tokenResponse = await oauth2Client.getAccessToken();
//     const accessToken = tokenResponse?.token;

//     if (!accessToken) {
//       throw new Error('Access token is null');
//     }

//     transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: config.get('adminEmail'),
//         clientId: config.get('clientId'),
//         clientSecret: config.get('clientSecret'),
//         refreshToken: config.get('refreshToken'),
//         accessToken
//       }
//     });

//     transporter.verify((error, success) => {
//       if (error) {
//         winston.error('Transporter verify error:', error);
//       } else {
//         winston.info('✅ Email transporter ready');
//       }
//     });

//   } catch (err) {
//     winston.error('❌ Failed to initialize email transporter:', err.message);
//   }
// })();

// module.exports = async function sendEmail(email, otp) {
//   throw new Error('Email sending disabled for testing');
// };
