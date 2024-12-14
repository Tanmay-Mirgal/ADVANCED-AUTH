import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email,verificationToken) => {
   const recipient =[{email}] ;

   try{
    const response = await mailtrapClient.send({
        from:sender,
        to:recipient,
        subject:"Verify your email",
        html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        category:"Email Verification",
    })
    console.log("Email sent successfully",response);
   }
   catch(error){
    console.log("Error sending email",error);
    throw new Error("Error sending email");
   }

}

export const sendWelcomeEmail = async (email,name)=>{
    const recipient =[{email}] ;
    try{
        const response=  await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid :"f1222d0c-d1ea-49b4-841c-ea9c319ac41e",
            template_variables:{
              name: name,
      company_info_name: "Lucifer !! "
            },
            
        });
        console.log("Welcome email sent successfully",response);
    }
    
    catch(error){
        console.log("Error sending welcome email",error);
        throw new Error("Error sending welcome email");
    }
}
export const sendPasswordResetEmail = async(email,resetURL)=>{
    const recipient =[{email}] ;
    try{
        const response=  await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:'reset password'
        });
        console.log("Reset password email sent successfully",response);
    }
    
    catch(error){
        console.log("Error sending reset password email",error);
        throw new Error("Error sending reset password email");
    }
 
}
export const sendResetSuccessEmail = async (email)=>{
    const recipient =[{email}] ;
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset password"
        });
    } catch (error) {
      console.log("Error sending reset success email", error);
      throw new Error("Error sending reset success email");
    }
}