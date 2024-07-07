const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const user_schema = Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    master_password_hint: {
        type: String,
        trim: true
    },
    application_passwords: [{
        type: Schema.Types.ObjectId,
        ref: 'Password'
    }],
    token: {
        type: "String"
    }
},
{
    timestamps: true
});

user_schema.methods.matchPassword = function(entered_password){
    return bcrypt.compare(entered_password, this.password)
 };
 
 user_schema.pre("save", async function(next){
   if (!this.isModified) {
     next();
   }
 
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
 });

module.exports = mongoose.model('User', user_schema);