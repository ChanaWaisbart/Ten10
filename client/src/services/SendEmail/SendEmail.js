import emailjs from 'emailjs-com';

export const sendEmail = (userName, userEmail, message) => {
    emailjs.send('service_rnn1skk', 'template_add', {
        userName: userName,
        userEmail: userEmail,
        message: message
    }, 'user_3t9Kr9HIvrYnkSHKaYsMo');
}




