const express = require("express"), path = require('path'), nodeMailer = require('nodemailer'), bodyParser = require('body-parser');
const app = express();

app.use(express.static('src'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/subscribe:pid/:p', function (req, res) {
  let postId = req.params.pid;
  let nLetter = req.params.p;
  const query = { "postId": { "$eq": postId } };
  const options = {
  "projection": {
      "userEmail": 1,
  },
  "sort": { "timeCommented": -1 },
};
itemsCollection.find(query, options).toArray()
.then(emails => {
    console.log(`Successfully found ${emails.length} documents.`)
    emails.forEach(console.log)
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 21,
        secure: true,
        auth: {
            // sample
            user: 'info@gmail.co,
            pass: 'info1234'
     });
  });
    let mailOptions = {
        // we change based on each users email
        to: email,
        subject: 'News Letter',
        body: nLetter
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    return emails
})
.catch(err => console.error(`Failed to find documents: ${err}`))
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});
let server = app.listen(process.env.PORN || 8080, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
