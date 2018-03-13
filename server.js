const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;

const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, respond, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  //console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
  return text.toUpperCase();
});

app.get('/', function(request, respond) {
  respond.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to the world!'
});
});

app.get('/about', function(request, respond) {
  respond.render('about.hbs', {
  pageTitle: 'About Page'
});
});

  app.get('/bad', function(request, respond) {
    respond.send({
      errorMessage: 'Unable to handle request'
    });
  });

app.listen(port, function(){
  console.log(`Server is running on port: ${port}`);
});
