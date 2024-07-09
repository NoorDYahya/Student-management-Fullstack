const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mydb');


var personalSchema = mongoose.model({
    name:{type:String ,required:true},
    age: Number,
    nationality:String,
});
var Person = mongoose.model("Person",personalSchema);
module.exports = Person;


