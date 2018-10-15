const GMAIL_USER = "YOUR USER";
const GMAIL_PASS = "PW";
const name = "name";
const receiver = "test@test.com";
const sender = "<test@test.com>";

const express = require('express');
const app = express();
const path = require('path');

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const routes = {
  "home": "/",
  "contact": "/contact"
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



app.get(routes.home, function (req, res) {
  res.send('index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post(routes.contact, function(req,res) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let HelperOptions = {
      from: name + sender,
      to: receiver,
      subject: 'New message from contact form',
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  transporter.sendMail(HelperOptions, (error, info) => {
    if(error) {
        return console.log(error);
    }
    else {
      res.redirect(routes.home);
    }
    console.log('Message was sent');
    console.log(info);
    
  });
});
