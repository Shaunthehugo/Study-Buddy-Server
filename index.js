// Example express application adding the parse-server module to expose Parse
// compatible API routes.

//var postmark = require('postmark');

//require('newrelic');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://<Shaun.dougherty@me.com>:<7Ba-LSh-sSv-xWW>@ds055495.mlab.com:55495/heroku_xhzww0jh',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'CTe0o6nbWeIB0xQnjJXAedLCgYAwlZDnUWpKmCUa',
  masterKey: process.env.MASTER_KEY || 'iElbl4yZx6jd2bYQTQlNVS1enD1GqVoq5qeomtlU', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://study-buddy-app.herokuapp.com/parse',  // Don't forget to change to https if needed
  clientKey: 'DaCKL4e8GQTD0ZfN6lb5arBHuEK554nHXQxAssJ4',
  push: {
    ios: [
      {
        pfx: '/Users/shaundougherty/Documents/ParseDevPush.p12',
        passphrase: '',
        bundleId: 'com.foru.StudyBuddy',
        production: false // Dev
      },
      {
        pfx: '/Users/shaundougherty/Documents/StudyBuddyPush.p12',
        passphrase: 'Longcivilwarreturns10',
        bundleId: 'com.foru.StudyBuddy',
        production: true // Prod
      }
    ]
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Oh shit, wuddup!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

//var client = new postmark.Client("10d4cbd2-e5f1-40d9-a3c9-3e027797fef3");

//client.sendEmailWithTemplate({
//  "From": "Shaun.dougherty@study-buddy-app.herokuapp.com",
//  "To": userEmail,
//  "TemplateId": 709801,
//  "TemplateModel": {
//    "product_name": "Study Buddy",
//    "name": userFirstName,
//    "action_url": "study-buddy-app.herokuapp.com/confirm",
//    "username": userEmail,
//    "sender_name": "Shaun Dougherty"
//  }
//});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
