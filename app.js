
const path = require('path')
const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require ('dotenv')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session  = require('express-session')
const MongoStore = require('connect-mongo')
const { connectDB }= require('./config/db')


//load config 
dotenv.config({ path: './config/config.env'});

// Passpot config
require('./config/passport')(passport);

connectDB();

const app = express();

//  Body parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json());

//Logging
  if(process.NODE_ENV === 'development'){
    app.use(morgan('dev'))
  }
// Hamdlebars Helpers
const { formatDate } = require('./helpers/hbs');

//Handlebars 
app.engine('.hbs',
 exphbs({
   helpers: {
     formatDate,
   },
   defaultLayout : 'main',
    extname: '.hbs'})
    );
app.set('view engine', '.hbs');


// Sessions
 storeSession = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  mongooseConnection: mongoose.connection,
  touchAfter: 24 * 3600 // time period in seconds
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: storeSession
})
)


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes 
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));


const PORT =  process.env.PORT || 5000;

app.listen(
    PORT,
     console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
     )

