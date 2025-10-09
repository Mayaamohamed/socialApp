import nodemailer from 'nodemailer'
import { type IEmailArgument } from '../../common/index.js'

export const SendEmail= async( {
    to,
    subject,
    content,
    attachemnt=[]
}:IEmailArgument
)=>{
const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,
    auth: {
        user: "mayahuma9@gmail.com",
        pass: "yzrphmbocgredugd"
    },
    tls: {
            rejectUnauthorized: false
          }
})
const info=await transporter.sendMail({
    from: "mayahuma9@gmail.com",
    to,
    //cc,
   // bcc,
    subject,
    //text,
    html:content, // i can't send text and html together
    attachments:[] // array 
    // it can be file and path
})
console.log(info)
return info;
}

import { EventEmitter } from "node:events";
 export const emitter =new EventEmitter() // create evemt

emitter.on('SendEmail',(args:IEmailArgument)=>{ // listener // if sendEmail function called so, listen to it
    console.log("the sending email event is started");
    console.log(args);
})
