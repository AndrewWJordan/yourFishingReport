// include modules
var express = require('express'),
    app = express(),
    path = require('path'),
    less = require('less-middleware'), // handles routing
    bodyParser = require('body-parser'); // more middleware for parsing form data

// Setting up MongoDB
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017/yourfishingreport', function (err, db) {
  if (err) throw err
})


app.use(bodyParser.urlencoded({
    extended: true
}))

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
// serve static content
app.use("/", express.static(__dirname + '/public'));

app.post('/results', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/yourfishingreport', function (err, db) {
        db.collection('reports').save(req.body, function (err, result) {
        if (err) { 
            return console.log(err);
        }
        console.log('saved report')
        res.redirect('/')
    })
})
})

// setup server
var server = app.listen(1337, function () {
    console.log('Listening on port 1337...')
})

console.log('May Node be with you');
