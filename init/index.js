const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";


// connection with mongo
main()
.then(()=>{
    console.log("connected successfully!");

})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data initialized!");
}

initDB();  // call function than it works.