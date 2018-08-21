const express =require('express');
const fs =require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = now +':' + req.method + ':' + req.url;
    //console.log('${now}: ${req.method} ${req.url}');
    //console.log(now +':' + req.method + ':' + req.url);
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
   
    next();
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    //res.send('<h1> Hello Express </h1>');
    
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        wellcomeMessage: 'Welcome to My Site'   
       });
    
    /*res.send ({
        name: 'wk',
        likes: [
            'bike',
            'gun'
        ]
    });*/
}); 

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
     pageTitle: 'About Page'   
    });
});

app.get('/bad', (req, res)=>{
    //res.send('<h1> Bad Page </h1>');
    res.send ({
        ErrorName: 'Unhandling Error'
        
    });
}); 

app.listen(port, ()=>{
    console.log('Server is up on port '+ port);
});