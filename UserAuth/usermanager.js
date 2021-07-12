/*
    This is the user manager class.

    This class manages all active users trying to auth their phone numbers.

    Responsibilities:
    - Generate random that will be used as a verification code
    - Initiate a new user registration process
    - Verify the user registration process
*/


const dprint = require("../util/dprint");

const User = require('./users.js');

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString();
}

class UserManager {
    constructor(tw) {
        this.instances = {};
        this.tw = tw;
        this.msg = "SuperZ Auth Module Code: ";
    }

    auth(number) {
        let code = random(111111, 999999)
        let user = new User(number, code, this.tw);

        dprint("Code waiting for auth: " + code)

        user.sendCode(this.msg + code);
        this.instances[number] = user;
    }

    check_auth(number, code) {
        if (this.instances[number]) {
            return this.instances[number].checkCode(code);
        }
        return null;
    }

    check(number) {
        if (this.instances[number]) {
            return this.instances[number].status();
        }
        return null;
    }
}

module.exports = UserManager;