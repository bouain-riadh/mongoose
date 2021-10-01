require("dotenv").config();
const mongoose = require("mongoose");
/* connecting to data base */
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/*creating schema*/
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  age: Number,

  favoriteFoods: [String],
});
/*creating model*/
const Person = mongoose.model("person", blogSchema);
/*Creating a document instance using the Person constructor*/
var p = new Person();
p.name = "marwen";
p.age = 27;
p.favoriteFoods = ["pizaa", "vodka"];
p.save(function (err, data) {
  if (err) {
    return console.error(err);
  }
  return console.log("success; create");
});
/*Creating Many Records with model.create()*/

Person.create(
  [
    {
      name: "do",
      age: 25,
      favoriteFoods: ["chicken", "spaghetti"],
    },
    {
      name: "sarra",
      age: 20,
      favoriteFoods: ["chocolat", "nutella"],
    },
  ],
  function (err, result) {
    if (err) {
      return console.error(err);
    }
    return console.log("success: create user");
  }
);
/*Finding all the people having a given name, using Model.find()*/
Person.find({
  name: "do", // search query
})
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
  let id = "611982f6cdd0722205b9e801"
/*Finding just one person which has a certain food in the person's favorites, using Model.findOne()*/  
Person.findOne({
  favoriteFoods: "chocolat", // search query
})
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
  /*Finding the (only!!) person having a given _id, using Model.findById()*/
Person.findById(id) // search query

  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
/*Find a person by _id ( use any of the above methods ) with the parameter personId as
 a search key. Add "hamburger" to the list of the person's favoriteFoods (you can use 
  Array.push()). Then - inside the find callback - save() the updated person*/
Person.findById(id, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    result.favoriteFoods.push("chicken");
    result.save((error, updatedResult) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success: adding favourite food");
      }
    });
  }
});
/*Find a person by Name and set the person's age to 20. Use the function parameter
 personName as a search key*/
Person.findOneAndUpdate(
  { name: "do" },
  { $set: { age: 20} },
  { new: true },
  (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log("update success");
  }
);
/*Delete one person by the person's _id. You should use one of the methods 
findByIdAndRemove() or findOneAndRemove().*/ 
Person.findByIdAndRemove("611983e3cdd0722205b9e802", function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log("Removed User : ", docs);
  }
});

var nameToRemove = "Mary";
/*Delete all the people whose name is “Mary”, using Model.remove(). Pass it to a 
query document with the name field set, and of course, do a callback.*/

Person.remove({ name: nameToRemove }, (error, JSONStatus) => {
  if (error) {
    console.log(error);
  } else {
    console.log("success : remove", JSONStatus);
  }
});

{
  var foodToSearch = "burritos";
/*Find people who like burritos. Sort them by name, limit the results to two documents,
 and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec()*/
  Person.find({ favoriteFoods: { $all: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((error, filteredResults) => {
      if (error) {
        console.log(error);
      } else {
        console.log("find/sort/limit/select : success", filteredResults);
      }
    });
}
