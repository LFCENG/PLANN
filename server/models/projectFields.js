var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var translate = require('../config/translate');

var fieldsSchema = new Schema({
    referenceName:  { type: String },
    readableName:   { type: String },
    type:           { type: String },
    isDefault:      { type: Boolean, default: false },
    isRequired:     { type: Boolean, default: false },
    allowDelete:    { type: Boolean, default: true },
    checked:        { type: Boolean, default: true },
    filterValue:    { type: String, default: null }
});

var ProjectFieldsSchema = new Schema({
    userId: { type: mongoose.Schema.ObjectId },
    fields: [fieldsSchema]
});


ProjectFieldsSchema.pre('save', function (next) {
    if (!this.fields || this.fields.length == 0) {
        this.fields.push(
            {referenceName: "reference", readableName: translate("Reference"), isDefault: true, type: "string", isRequired: true, allowDelete: false},
            {referenceName: "title", readableName: translate("Title"), isDefault: true, type: "string", isRequired: true, allowDelete: false},
            {referenceName: "status", readableName: translate("Status"), isDefault: true, type: "string", isRequired: true, allowDelete: false},
            {referenceName: "client", readableName: translate("Client"), isDefault: true, type: "string", isRequired: true, allowDelete: false}
            
            
            //{referenceName: "owner", readableName: translate("Owner"), isDefault: true, type: "string", allowDelete: false},
            //{referenceName: "address", readableName: translate("Address"), isDefault: true, type: "string"},
            //{referenceName: "deadline", readableName: translate("Deadline"), isDefault: true, type: "date", filterValue: "dd MMMM yyyy"},
            //{referenceName: "finishedDate", readableName: translate("Finished Date"), isDefault: true, type: "date", filterValue: 'dd MMMM yyyy'},
            //{referenceName: "timeSpent", readableName:translate("Time Spent"), isDefault: true, type: "time", filterValue: 'h'},
            //{referenceName: "description", readableName: translate("Description"), isDefault: true, type: "string"},
            //{referenceName: "price", readableName: translate("Price"), isDefault: true, type: "currency", filterValue: '&euro; '},
            //{referenceName: "quoteReference", readableName: translate("Quote Reference"), isDefault: true, type: "string"}

            
        );
    }
    next();
});

module.exports = mongoose.model('ProjectFields', ProjectFieldsSchema);

