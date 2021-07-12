/*
    This is the user class.

    This class contains the basic user information and is responsible for:
    - Storing the user phone number and code that is going to be use for verification.
    - Track the status of the verification process.
*/

class User {
    constructor(number, code, tw) {
        this.number = number;
        this.code = code;
        this.tw = tw;
        this.status = 'init';
    }

    // Send code to user this.number
    sendCode(code) {
        this.tw.sendText(this.number, code);
        this.status = 'SENT';
    }

    checkCode(code) {
        if (this.code === code) {
            this.status = "AUTHED";
            return true;
        }

        return false;
    }

    status() {
        return this.status;
    }
}

module.exports = User;