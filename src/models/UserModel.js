
// import module `mongoose`
import mongoose from "mongoose";

// defines the schema for collection `users`
const UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    idNum: {
        type: Number,
        required: true
    },
    pw: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
export default User;