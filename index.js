const express = require('express');
const app = express();

app.listen(3001, () => {console.log("Server started at port 3001")});

const mailer = require('nodemailer');

// Creating a transporter
const transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'youremail@domain.com',
        pass: 'your-password'
    }
});

//sending the email
function sendEmail(message){
    transporter.sendMail({
        from: '"Dipak" <dipak.b@nonstopio.com>',
        to: '"Your email" <youremail@domain.com>',
        subject: 'Scheduled Job Email',
        text: message
    })
        .then(_ => {console.log("Email sent on " + new Date())})
        .catch(error => {console.log(error)});
}

const cron = require('node-cron');

// cron run at every 10 min
cron.schedule('*/1 * * * *', function(){
    sendEmail("Hey there, this email was sent to you automatically");
});