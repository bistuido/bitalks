var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    password: {type: String, required: true},
    admin: {type: Boolean, required: true}
});
module.exports = mongoose.model('User', UserSchema);
