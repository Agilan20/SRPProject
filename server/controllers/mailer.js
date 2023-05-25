import sendEmail from "../sendEmail.js";


// https://ethereal.email/create
// let nodeConfig = {
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.EMAIL, // generated ethereal user
//         pass: process.env.PASSWORD, // generated ethereal password
//     }
// }

// let transporter = nodemailer.createTransport(nodeConfig);

// let MailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//         name: "Mailgen",
//         link: 'https://mailgen.js/'
//     }
// })

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    console.log(username, userEmail, text, subject)
    
    await sendEmail(userEmail, `Welcome ${username}`, "Welcome to DIST scholarship application")
        .then(() => {

            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch(error => {
            res.status(500).send({ error })
        })
}