var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var playerSchema = new Schema({
    name: {type: String, required: true, unique: true}, 
    ppg: {type: Number, required: true},
    apg: {type: Number, required: true},
    rpg: {type: Number, required: true},
    pic: {type: String} 

    
}); 

module.exports = mongoose.model('Player', playerSchema); 