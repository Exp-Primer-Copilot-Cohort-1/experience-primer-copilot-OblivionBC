//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

//Set view engine
app.set('view engine', 'ejs');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Set body parser
app.use(bodyParser.urlencoded({extended: true}));

//Read json file
var comments = require('./comments.json');

//Set router
app.get('/', function(req, res) {
    res.render('index', {
        title: 'My App',
        comments: comments
    });
});

app.get('/comments', function(req, res) {
    res.render('comments', {
        title: 'Comments',
        comments: comments
    });
});

app.get('/comments/new', function(req, res) {
    res.render('new');
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/comments');
    });
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000...');
});