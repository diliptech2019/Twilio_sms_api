require('dotenv').config()
const express = require("express")
const app = express() 
const config = require("./config")
const client = require("twilio")(config.accountSID,config.authTOKEN)



//for login call we need varification id along with phone no and channel type i.e sms

app.get("/login",(req,res)=>{
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel
        })
        .then((data)=>{
            res.status(200).send(data)
        })
})

//here call verify through verivicationchek method by passing phone no and code

app.get("/verify",(req,res)=>{
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to: `+${req.query.phonenumber}`,
            code: req.query.code
        })
        .then((data)=>{
            res.status(200).send(data)
        })

})

app.listen(process.env.App_PORT, () =>{
    console.log(`The server is running at:`,process.env.App_PORT)
})