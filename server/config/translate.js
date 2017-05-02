var translate = function (string) {
    console.log(pt[string] || string);
    return pt[string] || string;
}

var pt = {
    "Reference" : "Referência",
    "Title" : "T\u00EDtulo",
    "Status"  : "Estado",
    "Client" : "Cliente"
    
};
module.exports = translate;
