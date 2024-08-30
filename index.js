const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();    //we use this to load the variables from the .env file

const app = express();

//setup Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());    //This code will parse any incoming JSON data

//testing with a simple route
app.get('/', (req, res)=>{
    res.send("Hello Mern Stack!, This a blog being constructed");
});

//Import routes
const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewURLParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

