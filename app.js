
const path = require('path')
const express = require('express');
const dotenv = require ('dotenv');
const exphbs = require('express-handlebars');
const { connectDB }= require('./config/db')


//load config 
dotenv.config({ path: './config/config.env'});

connectDB();

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

const PORT =  process.env.PORT || 5000

app.listen(
    PORT,
     console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
     )

