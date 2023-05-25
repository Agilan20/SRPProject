import mongoose from "mongoose";

export const ScholarshipSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    description: { type: String},
    image: { type: String},
    eligilibity: { type: String},
    deadline: { type: String},
    price: { type: String}
});

export default mongoose.model.Scholarships || mongoose.model('Scholarship', ScholarshipSchema);