const ora = require('ora');

module.exports = (args, service) => {
    const spinner = ora().start();
    spinner.color = 'yellow';
    spinner.prefixText = 'deleting the workspace information';

    const ws_id = args.id || null;

    const params = {
        workspace_id: ws_id
    };

    service.deleteWorkspace(params)
        .then(res => {
            console.log(`\nYour workspace deleted successfully`);
            spinner.stop();
        })
        .catch(err => {
            console.log(err);
            spinner.stop();
        });
}