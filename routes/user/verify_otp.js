const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require( 'joi' );
const {Otp} = require('../../models/otp');

const router = express.Router();

router.post('/',async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const matchedOtp = await Otp.findOne({
        email: req.body.email,
    })
    if(!matchedOtp) return res.status(400).send('No OTP record found');

    const {expiresAt} = matchedOtp;
    if(expiresAt<Date.now()) {
        await Otp.deleteOne({ email });
        return res.status(400).send('OTP has expired. Request a new one');
    }

    const hashedOtp = matchedOtp.otp;
    const validOtp = await bcrypt.compare(req.body.otp,hashedOtp);
    res.status(200).json({valid:validOtp});
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        otp: Joi.string().required().length(6)
    });

    return schema.validate(req);
}

module.exports = router;