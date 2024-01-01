const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapasync = require("./utils/wrapasync.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);  // for ejsMate....

// connection with mongo
main()
.then(()=>{
    console.log("connected successfully!");

})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_URL);
}

// home route
app.get("/listings", async (req,res)=>{
    let allListings = await Listing.find();
    // console.log(allListing);
    res.render("./listings/index.ejs",{ allListings });
})

// new rout:
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})

//create new data ane redirect it
app.post("/listings",wrapasync(async (req,res)=>{
    let newListing = new Listing(req.body.listing);   // directly write req.body.listing because of code in new.ejs.
    await newListing.save();
    res.redirect("/listings");
}))

// edit data:

app.get("/listings/:id/edit", async(req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{ listing })
})

// update data in database:

app.put("/listings/:id", async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    res.redirect(`/listings/${id}`);  // go back to show data route


})

// show data in detail:
app.get("/listings/:id",async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{ listing })
})

// delete route:
app.delete("/listings/:id", async(req,res)=>{
    let { id } = req.params;
    const deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listings");
})

app.get("/",(req,res)=>{
    res.send("welcome!");
})

//handle error
app.use((err,req,res,next)=>{
    res.send("something went wrong!");
})



app.listen(8080,()=>{
    console.log("app listening at port 8080");
})
// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("testing successful!");
// })
