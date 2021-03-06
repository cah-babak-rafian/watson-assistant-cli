const ora = require('ora');
const fs = require('fs');
var utility = require(`../utilities/utility.js`);

module.exports = (args, service) => {
    const spinner = ora().start();
    spinner.color = 'yellow';
    spinner.prefixText = 'pushing your workspace...';

    const name = args._[1];
    const ws_id = utility.getWorkspaceID(name, service);
    const fileName = args.name || args.n;
    let watson_assistant = {};
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        watson_assistant = JSON.parse(data);

        ws_id.then(id => {
            const params = {
                workspace_id: id,
                //name: watson_assistant['name'] || null,
                //language: watson_assistant['language'] || null,
                //description: watson_assistant['description'] || null,
                intents: watson_assistant['intents'] || null,
                entities: watson_assistant['entities'] || null,
                dialog_nodes: watson_assistant['dialog_nodes'] || null,
                counterexamples: watson_assistant['counterexamples'] || null,
                metadata: watson_assistant['metadata'] || null,
                learning_opt_out: watson_assistant['learning_opt_out'] || null,
                append: false
            };
            //console.log('params keys: '+ Object.keys(params));
            //console.log('watson-assistant keys: '+ Object.keys(watson_assistant));
            //console.log(Object.is(watson_assistant, params));
            service.updateWorkspace(params).then(res => {
                console.log(JSON.stringify(res, null, 2));
                spinner.stop();
                console.log(`Your watson-assistant pushed successfully`);
            }).catch(err => {
                console.log(err);
                spinner.stop();
            });
        },
            err => {
                console.log(`\n${err.message}`);
                spinner.stop();
            })
    });
}