
const path = require('path');
const express = require('express');
const dotenv = require ('dotenv');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');


//load config 
dotenv.config({ path: './config/config.env'});

require('./config/db')();

const app = express();


  // app.use(express.json());

  //logging
  if(process.NODE_ENV === 'development'){
    app.use(morgan('dev'))
  }
//Handlebars 
app.engine('.hbs', exphbs({defaultLayout : 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes 
app.use('/', require('./routes/index'));

const PORT =  process.env.port || 5000

app.listen(
    PORT,
     console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
     )

