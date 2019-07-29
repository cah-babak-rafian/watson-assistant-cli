const ora = require('ora');
var utility = require(`../utilities/utility.js`);

module.exports = (args, service) => {

    const name = args.name || args.n;
    const ws_id = utility.getWorkspaceID(name, service)//args.id || null;
    ws_id.then(id => {

        const params = {
            workspace_id: id
        };

        service.deleteWorkspace(params)
            .then(res => {
                console.log(`\n   The workspace ${name} deleted successfully   \n`);
            })
            .catch(err => {
                console.log(err);
            });
    },
        err => {
            console.log(err.message);
        });
}