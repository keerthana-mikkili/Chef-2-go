import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as dotenv from 'dotenv/config';

const sendEmail = async (senderEmail, otp) => {
  try {

    const CLIENT_ID = "494767139204-5p1s4771192p08obvbnfol0njnlabfqg.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REDIRECT_URL = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = "1//04dFGZYG7FwSBCgYIARAAGAQSNwF-L9IrT5ec6I4g54SWKpSzHDdISI6JMWw0o6RRssGGpso10Q--dUGOWqvi6-_NO9EhJY1oP78";
    const SENDER_EMAIL = "patilbasavaraj293@gmail.com";

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    );

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,// process.env.USER_EMAIL,
        clientId: CLIENT_ID,// process.env.CLIENT_ID,
        clientSecret: CLIENT_SECRET,//process.env.CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,//1234 process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `CHEF2GO <${SENDER_EMAIL}>`,// process.env.USER_EMAIL,
      to: senderEmail,
      subject: 'Email Verification for CHEF2GO',
      html: `<h2>Welcome to CHEF2GO!</h2><p>Thanks for signing up at CHEF2GO. Your OTP is <b>${otp}</b>, it will expire in 2 minutes.<br></p><h3>See you soon!</h3>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Email not sent due to the error:', error.message);
  }
};

export default sendEmail;
