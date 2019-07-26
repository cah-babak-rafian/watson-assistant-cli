const ora = require('ora');
const fs = require('fs');

module.exports = (args, service) => {
    const spinner = ora().start();
    spinner.color = 'yellow';
    spinner.prefixText = 'creating new workspace...';

    const ws_name = args.name || args.n;
    const desc = args.desc || args.d;

    var workspace = {
        name: ws_name || 'New workspace',
        description: desc || 'No description provided'
      };
      
      service.createWorkspace(workspace)
        .then(res => {
          console.log(JSON.stringify(res, null, 2));
          spinner.stop();
        })
        .catch(err => {
          console.log(err);
          spinner.stop();
        });
}