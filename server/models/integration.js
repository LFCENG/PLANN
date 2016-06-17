var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Integration = new Schema({
    created: {type : Date, default: Date.now},
    userId: { type: mongoose.Schema.ObjectId },
    integration: {type: String},
    token: {type: String}
});

module.exports = mongoose.model('Integration', Integration);

