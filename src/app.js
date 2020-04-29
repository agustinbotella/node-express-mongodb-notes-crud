const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB CONNECTION
//There's not a true MongoDB conection for security purposes.
//For production please change for a working MongoDB conection string
mongoose.connect('mongodb://user:password@host:port/db?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
        .then(db => console.log('Correctly connected to Mongo DB'))
        .catch(err => console.error(err));

//ROUTES IMPORT
//I call the router module with the routes for Index
//In case we add more pages, it's neccesary to require other files
const indexRoutes = require('./routes/index');

//SETTINGS
// Setting port to be used. I take the port from the server and it case it doesnt provide a default one, I set 3000 as port.
app.set('port', process.env.PORT || 3000);  
// Setting the 'views' folder location. I use the path module, that I previously installed to see current folder and with the join function I add /views
app.set('views', path.join(__dirname, 'views'));
// Setting template engine. So node knows which template engine Im using. In these case we will use EJS as engine
app.set('view engine', 'ejs');

//We use extend:false so it only receives text and not images or other formats
app.use(express.urlencoded({extended: false}));

//ROUTES
app.use('/', indexRoutes);

//SERVER INITIALIZATION
app.listen(app.get('port'), () => {
    console.log('Server on port '+app.get('port'));
});