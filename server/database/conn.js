// import mongoose from "mongoose";

// import { MongoMemoryServer } from "mongodb-memory-server";
// import ENV from '../config.js'

// async function connect(){

//     const mongod = await MongoMemoryServer.create();
//     const getUri = mongod.getUri();

//     mongoose.set('strictQuery', true)
//     // const db = await mongoose.connect(getUri);
//     const db = await mongoose.connect(ENV.ATLAS_URI);
//     console.log("Database Connected")
//     return db;
// }

// export default connect;
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connection = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_URI, connectionParams);
        console.log('DB connection successful');
    } catch (error) {
        console.log(error);
    }
}

export default connection