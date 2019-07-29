
exports.getWorkspaceID = function(name, service){
    return new Promise((resolve, reject) => {
        service.listWorkspaces()
        .then(res => {
            let id = null;
            for(ws in res.workspaces ){
                if(res.workspaces[ws].name == name){
                    id = res.workspaces[ws].workspace_id;
                }
            }
            if(id){
                resolve(id);
            }else{
                reject(new Error(`\n    No workspace found with the name of ${name}\n`));
            }
        }).catch( err => 
            console.log(err)
        );
    });
}
