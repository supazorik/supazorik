/*
    This is the Twilio Manager class.

    This class is responsible for the communication the API has with the Twilio API.
*/

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const dprint = require('../util/dprint.js');


class TwilManager {
    constructor() {
        this.client = require('twilio')(accountSid, authToken);
    }

    sendText(to, message) {
        return this.client.messages.create({
            to: to,
            from: process.env.PHONE_NUMBER,
            body: message
        });
    }

    getClient() {
        return this.client;
    }
}

module.exports = TwilManager;