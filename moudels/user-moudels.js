const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mydb');


var personalSchema = mongoose.model({

})
var Person = mongoose.model("Person",personalSchema);
module.exports = Person;


