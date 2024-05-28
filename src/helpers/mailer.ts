
import nodemailer from "nodemailer"
export const sendEmail = async ({email,emailType,userId}:any) =>{
    try {

        // #TODO: configure mail ****

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });


          const mailOptions = {
            from: 'asifahmedsahil.007@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "verify your email " : "reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          }

          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
} 