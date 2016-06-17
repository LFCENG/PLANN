var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    created: {type : Date, default: Date.now},
    userId: { type: mongoose.Schema.ObjectId },
    quoteReference: {type: String},
    reference: {type: String},
    title: {type: String},
    client: {type: String},    
    owner: {type: String},
    address: {type: String},
    status: {type: String},
    deadline: {type: Date},
    finishedDate: {type: Date},
    description : {type: String},
    price : {type: String}
});

module.exports = mongoose.model('Project', Project);

