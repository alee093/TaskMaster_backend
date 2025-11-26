import mailTransporter from '../config/mailTransporter.config.js'
import ENVIRONMENT from '../config/environment.config.js'

export const sendVerificationEmail = async (userEmail, token, username) => {
  const verificationLink = `${ENVIRONMENT.URL_FRONTEND}/verify-email?token=${token}`

  const mailOptions = {
    from: ENVIRONMENT.GMAIL_USER,
    to: userEmail,
      subject: 'Verify Your Email for TaskMaster',
      text: `Hello ${username}, please verify your email by visiting: ${verificationLink}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color:#333; line-height:1.4; background:#f6f7fb; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center">
                <table style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.08);" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="background:#4f46e5; padding:20px; text-align:center; color:#ffffff;">
                      <h1 style="margin:0; font-size:20px;">TaskMaster</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;">
                      <h2 style="margin:0 0 8px; font-size:18px; color:#111;">Hello, ${username}!</h2>
                      <p style="margin:0 0 16px;">Thanks for signing up to TaskMaster. To complete your registration, please verify your email address by clicking the button below.</p>
                      <p style="text-align:center; margin:20px 0;">
                        <a href="${verificationLink}" style="display:inline-block; padding:12px 22px; background:#10b981; color:#ffffff; border-radius:6px; text-decoration:none; font-weight:600;">Verify Email</a>
                      </p>
                      <p style="font-size:12px; color:#666; margin-top:12px;">If you didn't create an account, you can safely ignore this email.</p>
                      <hr style="border:none; border-top:1px solid #eee; margin:18px 0;" />
                      <p style="font-size:13px; color:#666;">If the button doesn't work, copy and paste the following link into your browser:</p>
                      <p style="font-size:12px; word-break:break-all; color:#0066cc;">${verificationLink}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f3f4f6; padding:12px; text-align:center; font-size:12px; color:#666;">
                      © ${new Date().getFullYear()} TaskMaster
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
  }

  try {
    await mailTransporter.sendMail(mailOptions)
    console.log(`[EMAIL SERVICE] Correo de verificación enviado a: ${userEmail}`)
  } catch (error) {
    console.error(`[EMAIL SERVICE ERROR] Fallo al enviar el correo a ${userEmail}:`, error)
    throw new Error('Fallo al enviar el correo de verificación.')
  }
}