import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

let mailTransporter

// If Gmail credentials are provided, use Gmail SMTP. Otherwise, use a
// jsonTransport (good for development/testing) so sendMail resolves and
// the message is available in logs instead of failing silently.
if (ENVIRONMENT.GMAIL_USER && ENVIRONMENT.GMAIL_PASSWORD) {
    mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ENVIRONMENT.GMAIL_USER,
            pass: ENVIRONMENT.GMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })
} else {
    console.warn('[MAIL TRANSPORTER] GMAIL credentials not found, using jsonTransport for development. Emails will not be sent.')
    mailTransporter = nodemailer.createTransport({ jsonTransport: true })
}

export default mailTransporter