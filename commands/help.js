const menus = {
  main: `
    wa [command] <options>
  
      pull .............. fetches a workspace
      push .............. pushes an existing workspace to specific workspace id
      create ............ creates a new workspace
      delete ............ deletes a workspace
      list .............. lists all the available workspace
      version ........... shows package version
      help .............. shows help menu for a command
      `,

  pull: `
    wa pull <options>
  
      --id, --wsid ..... the workspace id to use
      -save, -s ........ flag to save the pulled object in a file
      -full, -f ........ flag to pull the full object 
      --name, --n ...... name of the file to store the WA object (default is watson-assistant.json)
      `,

  push: `
    wa push <options>
    
      --id, --wsid ..... the workspace id to use
      --name, --n ...... name of the json file to be pushed
      `,

  create: `
    wa create <options>
    
      --name, --n ...... name of the workspace to be created
      --desc, --d ...... description of the workspace
      `,

  delete: `
      wa delete <options>
  
       --id .... the workspace id to delete
       `,

  list: `
    wa list <options>

     -save, -s ..... will save in wa-list.json file
     --name, --n .... the name of the file to be saved
     `,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}