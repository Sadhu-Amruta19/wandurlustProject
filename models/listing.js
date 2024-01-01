const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        // default:"https://unsplash.com/photos/gray-concrete-bridge-and-waterfalls-during-daytime-cssvEZacHvQ",
        default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        set: (v)=> v===""? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v, 
    },
    price:Number,
    location:String,
    country:String,
})

const Listing = mongoose.model("Listing",listSchema);

module.exports=Listing;