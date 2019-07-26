const minimist = require('minimist');
const AssistantV1 = require('ibm-watson/assistant/v1');

module.exports = () => {
    const args = minimist(process.argv.slice(2));

    const service = new AssistantV1({
        version: '2018-02-16',
        iam_apikey: 'ceaZ4zCp8jpmEQ4OQUo_Ryec7oWAaItbBVHKKJ1ZESY1',
        url: 'https://gateway.watsonplatform.net/assistant/api'
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