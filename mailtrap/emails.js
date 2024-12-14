import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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