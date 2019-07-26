const ora = require('ora');
const fs = require('fs');

module.exports = (args, service) => {
    const spinner = ora().start();
    spinner.color = 'yellow';
    spinner.prefixText = 'pulling your work space information';

    const id = args.id || args.wsid;
    const full = args.full || args.f;
    const saveReq = args.save || args.s;
    const print = args.print || args.p;
    let fileName = (!(args.name || args.n)) ? `watson-assistant.json`: (args.name || args.n) + `.json`;

    const params = {
        workspace_id: id, //'66e51b25-a8db-4552-af6e-79e199e41037'
        _export : full
    };

    service.getWorkspace(params)
        .then(res => {
            if(!full || print){
                console.log(JSON.stringify(res, null, 2));
            }
            if(saveReq){
                fs.writeFile(fileName, JSON.stringify(res, null, 2), (err) => {
                    if (err) throw err;
                    console.log('watson-assistat has been pulled and saved in ' + fileName);
                  });
            }
            spinner.stop()
        })
        .catch(err => {
            console.log(err);
            spinner.stop();
        });

}