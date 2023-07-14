require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const dns = require('dns-lookup');
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema  = new mongoose.Schema({
  original_url: {
      type: String,
      required: true,
      unique: true
  },
  short_url:{
      type: Number,
      required: true,
      unique: true
  },
})

let url = mongoose.model('url', urlSchema)


// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint


app.post("/api/shorturl", (req, res) => {
  let inputUrl = req.body.url

//Check for valid url format
  try {
    validUrl = new URL (inputUrl)
    
//If url format is valid, check if host exists  
    
    dns(validUrl.hostname, (err, address) => {
      if(err){
        //res.json({error:"Invalid Hostname"})
        res.json({ error: 'invalid url' })
      } else{
        
//If success will check DB for reference and add new document if not found
//Check if provided url already exists in db
        
    async function findUrl() {
      try {
        const foundUrl = await url.find({ original_url: validUrl.href }).exec();
    
        if(foundUrl[0]){
          
          //Found! Return desired JSON message
          
          res.json({original_url:foundUrl[0].original_url,short_url: foundUrl[0].short_url})

        } else{
          
          //NOT found, add to db and return desired JSON message        
          let urlCount
          const count = async () => {
            try {
              urlCount = await url.countDocuments({})
              
          //Adds entry to db
              
              let newUrl = new url ({original_url: validUrl.href, short_url: urlCount})
              newUrl.save()
              res.json({original_url:validUrl.href,short_url:urlCount})
            } catch (error) {
              console.log(error)
            }
          }
          count()
        }
      } catch (error) {
        console.log(error);
      }
    }
    findUrl();
      }
    }) 
  } catch {
    res.json({ error: 'invalid url' })
  }
})


app.get("/api/shorturl/:short_url", (req, res) => {
  let short = req.params.short_url

//Find db document with provided short url
  async function findByShort() {
    try {
      const foundUrl = await url.find({ short_url: short }).exec();
      //If found, get url and redirect user
      if(foundUrl[0]){
        res.redirect(foundUrl[0].original_url)
      } else {
        //if not found, present error message
        res.json({error:"No short URL found for the given input"})
      }
    } catch (error) {
      console.log(error);
    }
  }
  findByShort();
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


