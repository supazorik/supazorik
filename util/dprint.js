function dprint(msg) {
    if (process.env.DEBUG === 'true') {
        console.log("[SDebug] " + msg);
    }
}

module.exports = dprint;