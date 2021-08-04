
const  mongoose = require('mongoose');


const MONGO_URL = 'mongodb://localhost:27017';

module.exports = function(){
    

    mongoose.connect(MONGO_URL, {

    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useCreateIndex: true ,
    useFindAndModify: false
    
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
    

} 
