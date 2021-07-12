const APIHandler = require('../util/api_handler.js');
const UserManager = require('../UserAuth/usermanager.js');
const TwilManager = require('./twilio_model.js');

const checkNumber = require('../util/check_number.js');
const dprint = require('../util/dprint.js');


const authModel = new APIHandler();
const twilio = new TwilManager();
const UsrMangr = new UserManager(twilio);

/*
    Steps:
    1. Start Auth -> Starts process and registers number
    - pnumber: phone number
    2. Check Auth -> Compares 'code' with the generated code, returns "AUTHED" if correct
    - pnumber: phone number
    - code: code
*/

authModel.add('START_AUTH', (res, data) => {
    const number = checkNumber(data.pnumber);

    if (!number) {res.status(404).end(); return;}
    dprint("Starting auth with number: " + number)
    UsrMangr.auth(number)

    res.send({
        status: 'INIT',
    });
});

authModel.add('CHECK_AUTH', (res, data) => {
    if (!data.pnumber) {res.send({status: 'Phone Number expected'}).end(); return;}

    const number = checkNumber(data.pnumber);
    const code = data.code;

    
    if (!code) {res.send({status: 'Code Expected.'}).end(); return;}

    let stat = UsrMangr.check_auth(number, code)

    if (stat) {
        dprint(number + " has been successfully authed with code " + code);
        res.send({
            status: 'AUTHED'
        });
    }
    else if (stat === null) {
        res.send({
            status: 'NUMBER_DNE'
        });
    }
    else {
        res.send({
            status: 'INCORRECT_CODE'
        });
    }
});

authModel.add('CHECK', (res, data) => {
    const number = checkNumber(data.pnumber);

    res.send({
        status: UsrMangr.check(number)
    });
});

module.exports = authModel;