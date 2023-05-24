const express = require('express');
const mongoose = require("mongoose");
const validatePhoneNumber = require('validate-phone-number-node-js');
const cors = require('cors');
const { response } = require('express');
const { sendEmail } = require('./sendEmail');
const app = express();
require("dotenv").config(); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB Atlas:', error);
    });
  
  
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
});


const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.send("Welcome to my backend")
})

app.get('/form-user', (req, res) => {
    User.find({})
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).json({message: err}))
});

app.post('/form-user', (req, res) => {
    const isMobValid = validatePhoneNumber.validate(req.body.mobile);
    if(isMobValid){
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
        });
        user
            .save()
            .then(
                () => {
                    res.status(200).json({message: 'Added '});
                  }, 
                (err) => {
                    res.status(400).json({message: err.message.includes('its required') ? 'Please fill all the fields' : err.message});    
                    
                }
            );
            sendEmail(req.body.email)
    } else {
       
    }
    
});





app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });


