var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fieldsValueSchema = new Schema({
    referenceName: {type: String},
    value: {type: Schema.Types.Mixed}
});

var ProjectSchema = new Schema({
    created: {type : Date, default: Date.now},
    userId: { type: Schema.ObjectId },
    //fields: [fieldsValueSchema]
    fields: { type: Schema.Types.Mixed}
});

module.exports = mongoose.model('Project', ProjectSchema);

