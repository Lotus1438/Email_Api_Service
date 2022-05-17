import rethinkdbdash from "rethinkdbdash"

export const createRethinkClient = () => {
    const rethink_client = rethinkdbdash({
        host: 'localhost',
        port: 28015
    })
    createTable(rethink_client)
     return rethink_client
    
}

export const createTable =(client)=> {
    client.db('mydb')
    // .tableCreate('messages').run();
}
