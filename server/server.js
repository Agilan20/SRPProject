import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connection from './database/conn.js';
import router from './router/route.js';
import profileRouter from "./router/profileUpdate.js"
import scholarshipRouter from "./router/scholarship.js"
import dotenv from 'dotenv'
dotenv.config()
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)
app.use('/api/profileUpdate', profileRouter)
app.use('/api/scholarshipUpdate',scholarshipRouter )

/** start server only when we have valid connection */
const start = async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        });
    } catch (error) {
        console.log(error)
    }
}
start()
