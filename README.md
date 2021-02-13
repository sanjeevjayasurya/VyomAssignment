# Vyom Assignment

  - Run `npm install` to install all the dependencies
  - Run `npm start` to start the application

# Configuration

  - Go to the `config.js` file in the root folder
  - After creating an account from twilio.com please enter the `ACCOUNT_SID` and `AUTH_TOKEN` in the file.
  - Enter the link to the database in `LINK_TO_DB` 
  - Install `ngrok` from https://ngrok.com
  - Run ngrok and expose your localhost using `ngrok http 3000` in another terminal 
  - Copy the forwarding link and paste it in https://www.twilio.com/console/voice/twiml/apps in the Voice Request URL

# Using the app 
  - Start the app using `npm start`
  - Enter your twilio number in the `from` input
  - Enter the number to be called in the `to` input
  - Press Call 
  - Make sure to enter the Phone Code(+91 in case of an Indian number before calling)