import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    typeOfUser: {
        type: String,
        required: [true, "Please provide a type of user"],
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    about: { type: String},
    idProof: { type: Array},
    firstName: { type: String},
    lastName: { type: String},
    citizenship: { type: String},
    mobile : { type : Number},
    address: { type: String},
    city: { type: String},
    state:{ type: String},
    zipCode: { type: String},
    profile: { type: String},
    documents: {type: Object}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);