
const  mongoose = require('mongoose');
const dotenv = require('dotenv');


module.exports.connectDB = async () => {

    dotenv.config({ path: './config/config.env'});

    const MONGO_URL =  process.env.MONGO_URL || 'mongodb://localhost:27017' 

    try{

        await mongoose.connect(MONGO_URL, {
    
        useNewUrlParser: true ,
        useUnifiedTopology: true ,
        useCreateIndex: true ,
        useFindAndModify: false
        
        })

        console.log(`MongoDB Connected: ${MONGO_URL}`)
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
    

} 
