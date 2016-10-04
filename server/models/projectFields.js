var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var translate = require('../config/translate');

var fieldsSchema = new Schema({
    name:           { type: String },
    label:          { type: String },
    type:           { type: String },
    "default":      { type: Boolean, default: false },
    required:       { type: Boolean, default: false },
    allowDelete:    { type: Boolean, default: true },
    checked:        { type: Boolean, default: true },
    filterValue:    { type: String, default: null }
});

var ProjectFields = new Schema({
    userId: { type: mongoose.Schema.ObjectId },
    fields: [fieldsSchema]
});


ProjectFields.pre('save', function (next) {
    if (!this.fields || this.fields.length == 0) {
        this.fields.push(
            {name: "reference", label: translate("Reference"), default: true, type: "string", required: true, allowDelete: false},
            {name: "title", label: translate("Title"), default: true, type: "string", required: true, allowDelete: false},
            {name: "status", label: translate("Status"), default: true, type: "string", required: true, allowDelete: false},
            {name: "client", label: translate("Client"), default: true, type: "string", allowDelete: false},
            {name: "owner", label: translate("Owner"), default: true, type: "string", allowDelete: false},
            {name: "address", label: translate("Address"), default: true, type: "string"},
            {name: "deadline", label: translate("Deadline"), default: true, type: "date", filterValue: "dd MMMM yyyy"},
            {name: "finishedDate", label: translate("Finished Date"), default: true, type: "date", filterValue: 'dd MMMM yyyy'},
            {name: "timeSpent", label:translate("Time Spent"), default: true, type: "time", filterValue: 'h'},
            {name: "description", label: translate("Description"), default: true, type: "string"},
            {name: "price", label: translate("Price"), default: true, type: "currency", filterValue: '&euro; '},
            {name: "quoteReference", label: translate("Quote Reference"), default: true, type: "string"}
        );
    }
    next();
});

module.exports = mongoose.model('ProjectFields', ProjectFields);

