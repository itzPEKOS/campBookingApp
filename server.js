const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const camps = require('./routes/camps');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use('/api/v1/camps',camps);
app.use('/api/v1/auth',auth);
app.use('/api/v1/bookings',bookings);

const PORT = process.env.PORT || 5003;

const server = app.listen(
    PORT,
    console.log(
        'Server running in', 
        process.env.NODE_ENV, 
        "on " + process.env.HOST + ":" + PORT
    ));

const swaggerOption = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express VacQ API'
        },
        servers: [
            {
                url: process.env.HOST + ':' + PORT + '/api/v1'
            }
        ],
    },
    apis: ['./routes/*.js'],
}
    
const swaggerDocs=swaggerJsDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    

//Handle unhandled promise rejections
process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});
