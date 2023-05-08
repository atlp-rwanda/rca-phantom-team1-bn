import { getUser } from "../services/auth.service";
import { sendEmail } from "../utils/email";
import { hashPassword } from "../utils/hash-password";
import { generateResetToken } from "../utils/reset-token";

export const resetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  
    const {resetToken, resetTokenExpiration} = generateResetToken()
  
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetTokenExpiration

    await user.save()
    sendEmail('Password Reset Request', email, `You are receiving this email because you (or someone else) has requested the reset of the password for your account.<br><br>
    Please click on the following link, or paste this into your browser to complete the process:<br><br>
    <a href="https://phantom-techbandit.netlify.app/reset-password/${resetToken}">Reset Password</a><br><br>
    This link is valid for 1 hour.<br><br>
    If you did not request this, please ignore this email and your password will remain unchanged.<br>`)

    return res.status(200).json({
        success: true,
        message: "reset password email sent",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: true,
        message: "reset password email fail",
    })
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hashedPassword = await hashPassword(newPassword)
    user.password = hashedPassword
    
    await user.save()

    return res.status(200).json({
      success: true,
      message: "user password updated",
    })
  } catch (error) {
    console.error(error);
    return res.status(500)({
        success: true,
        message: "failed to update password",
    })
  }
}