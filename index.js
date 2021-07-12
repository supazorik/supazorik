'use strict';

require('dotenv').config();
const dprint = require('./util/dprint.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const handle = require('./models/auth_model.js');

// Make a command handler using a dictionary. INSTRUCT = what to do ['One to create the user and send the auth code', 'One to check the auth code'], 



app.post('/hook', (req, res) => {
    if (req.body.instruct) {
        dprint("Request made");
        let info = req.body;
        handle.call(info.instruct, info, res);
    }
});

app.listen(3000, () => console.log('[Super Phone Auth] Webhook is listening'));
