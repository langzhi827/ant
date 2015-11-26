var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hello2nodejs@gmail.com',
        pass: ''
    }
});

module.exports = function (to, subject, html, callback) {

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'hello2nodejs@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, callback);
}

