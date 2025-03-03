import emailjs from 'emailjs-com';
import Config from 'react-native-config';

export const sendEmail = async (userEmail, recipientEmail, subject, message, dispatch, draft) => {
  console.log('📤 Sending email in progress...');

  const templateParams = {
    from_name: userEmail,      
    from_email: userEmail,     
    to_name: recipientEmail,    
    to_email: recipientEmail,   
    subject: subject,           
    message: message,           
  };

  try {
    const response = await emailjs.send(
    Config.EMAILJS_SERVICE_ID, 
      Config.EMAILJS_TEMPLATE_ID, 
      templateParams, 
      Config.EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };

  } catch (error) {
  
    return { success: false, error };
  }
};
