#!/usr/bin/env node
const minimist = require('minimist');
const dotenv = require('dotenv');
dotenv.config();
const AssistantV1 = require('ibm-watson/assistant/v1');

module.exports = () => {
    const args = minimist(process.argv.slice(2));

    const service = new AssistantV1({
        version: '2018-02-16',
        iam_apikey: process.env.IBM_API_KEY,
        url: process.env.IBM_URL
    });

    let cmd = args._[0] || 'help';

    // if (args.version || args.v) {
    //     cmd = 'version'
    // }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'pull':
            require('./commands/pull')(args, service);
            break;
        case 'push':
            require('./commands/push')(args, service);
            break;
        case 'delete':
            require('./commands/delete')(args, service);
            break;
        case 'list':
            require('./commands/list')(args, service)
            break;
        case 'create':
            require('./commands/create')(args, service)
            break;
        case 'version':
            require('./commands/version')(args)
            break;
        case 'help':
            require('./commands/help')(args)
            break;
        default:
            console.error(`"${cmd}" is not a valid command!`)
            break;
    }
}