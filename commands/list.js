const ora = require('ora');
const fs = require('fs');

module.exports = (args, service) => {
    const spinner = ora().start();
    spinner.color = 'yellow';
    spinner.prefixText = 'listing work space information';

    const saveReq = args.save || args.s;
    const fileName = (args.name || args.n)? `${args.name || args.n}.json`: 'wa-list.json'; 
    service.listWorkspaces()
        .then(res => {
            console.log(JSON.stringify(res, null, 2));
            console.log(`saveReq: `+ saveReq);
            if(saveReq){
                fs.writeFile(fileName, JSON.stringify(res, null, 2), (err) => {
                    if (err) throw err;
                    console.log('watson-assistat list has been saved in ' + fileName);
                  });
            }
            spinner.stop();
        })
        .catch(err => {
            console.log(err);
            spinner.stop();
        });
}