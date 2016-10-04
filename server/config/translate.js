var translate = function (string) {
    console.log(pt[string] || string);
    return pt[string] || string;
}

var pt = {
    "Reference" : "Referência"
};
module.exports = translate;
