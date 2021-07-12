const dprint = require("./dprint");

class APIHandler {
    /*
        Should be able to:
        - search through dict for command and run callback
    */
    
    constructor() {
        this.cmds = {};
    }

    /*
        data = {
            instruct: instruct,
            data: data, // processing only
            cb: (data) => {},
        }
    */
    add(instruct, cb) {
        this.cmds[instruct] = cb;
    }

    call(instruct, data, res) {
        dprint("Instruct: " + instruct);

        if (data.secret !== process.env.SECRET) {
            dprint("Secret mismatch");
            res.status(404).end();
            return;
        }

        if (this.cmds[instruct]) {
            this.cmds[instruct](res, data);
        } else {
            res.status(404).end()
        }
    }
}

module.exports = APIHandler;