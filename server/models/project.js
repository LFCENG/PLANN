var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    created: {type : Date, default: Date.now},
    userId: { type: mongoose.Schema.ObjectId },
    fields: { type: Schema.Types.Mixed}
});


module.exports = mongoose.model('Project', Project);

