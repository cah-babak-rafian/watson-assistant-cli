const ora = require('ora');
const fs = require('fs');

module.exports = (args, service) => {
    const spinner = ora().start();
    spinner.color = 'yellow';
    spinner.indent = 2;
    spinner.prefixText = 'listing work space information';

    const saveReq = args.save || args.s;
    const fileName = (args.name || args.n)? `${args.name || args.n}.json`: 'wa-list.json'; 
    service.listWorkspaces()
        .then(res => {
            //console.log(JSON.stringify(res, null, 2));
            console.log(`\n`);
            for(ws in res.workspaces ){
                let num = parseInt(ws) + 1;
                console.log(`   ---> ` + num +`) ` + res.workspaces[ws].name);
            }
            console.log(`\n`);
            if(saveReq){
                fs.writeFile(fileName, JSON.stringify(res, null, 2), (err) => {
                    if (err) throw err;
                    console.log('watson-assistat full list has been saved in ' + fileName);
                  });
            }
            
            spinner.stop();
        })
        .catch(err => {
            console.log(err);
            spinner.stop();
        });
}