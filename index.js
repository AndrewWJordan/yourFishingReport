var db;

// include modules
var express = require('express'),
    app = express(),
    path = require('path'),
    less = require('less-middleware'), // handles routing
    bodyParser = require('body-parser'), // more middleware for parsing form data
    validator = require('express-validator'), // form validation 
    MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(validator());

// compile and serve css
app.use(less(path.join(__dirname, 'source', 'less'), {
    dest: path.join(__dirname, 'public'),
    options: {
        compiler: {
            compress: false,
        },
    },
    preprocess: {
        path: function (pathname, req) {
            return pathname.replace('/css/', '/');
        },
    },
    force: true,
}));

// Connecting to MongoDB and server
MongoClient.connect('mongodb://localhost:27017/yourfishingreport', function (err, database) {
    if (err) {
        return console.log(err);
    }
    // Save connection to db variable for future connections
    db = database;
    console.log('Mongo connected.  Starting server...')
        // setup server
    var server = app.listen(1337, function () {
            console.log('Listening on port 1337...')
            console.log('May Node be with you');
        })
        //res.redirect('/')
})

// serve static content in /public
app.use("/", express.static(__dirname + '/public'));

// Form posting for report.html
app.post('/results', function (req, res) {
    // Validating form input from report.html
    //req.checkBody("leader_email", "Enter a valid email address.").isEmail();

    // Saving to MongoDB
    db.collection('reports').save(req.body, function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log('Report saved.');
        //res.redirect('/')
        res.send('Report saved successfully.');
    })
})

// Gather results and populate on map
app.get('/test', function (req, res) {
    var cursor = db.collection('reports').find().toArray(function(err, results) {
        console.log(results);
    })
})