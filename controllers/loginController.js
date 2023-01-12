const dbOperation = require('../database/db-operations')
var popupMsg = require('../constants/popup-message')
const nodemailer = require('nodemailer')

const getLoginDetails = (req, res) => {
    var result = dbOperation.selectFromDB("signup_table", []);
    result.then((data) => {
        res.writeHead(200, "Success")
        res.write(JSON.stringify(data));
        return res.end();
    }, (err) => {
        res.write(JSON.stringify(err))
        return res.end();
    })
}

const insertIntoSignupTable = (req, res) => {
    var result = dbOperation.insertIntoDB("signup_table", {
        "full_name" : req.body.full_name,
        "email" : req.body.email,
        "phone" : req.body.phone,
        "country" : req.body.country
    });

    result.then(data => {
        sendEmail(req.body.email, res)

    }, err => {
        res.writeHead(500, "Internal Server Error")
        if(err.code == "ER_DUP_ENTRY"){
            res.write(JSON.stringify(popupMsg.messageBody.DUP_USER));
        }
        else{
            res.write(JSON.stringify(data));
        }

        return res.end();
    })
}

const sendEmail = (email, response) =>
{
    dbOperation.sendOTPToMail(email).then(data => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.G_USERNAME,
              pass: process.env.G_PASSWORD,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN
            }
          });
    
          let mailOptions = {
            from: "Sample Blogger",
            to: email,
            subject: 'OTP for Sample Blogger account creation',
            text: "Your OTP for account creation is "+data[0].otp_value
          };

          transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
            //   console.log(data);
              response.writeHead(200, "Success")
              response.write(JSON.stringify(data));
              return response.end();
            }
          });
    }, err => {

    })
}

module.exports = {
    getLoginDetails,
    insertIntoSignupTable
}