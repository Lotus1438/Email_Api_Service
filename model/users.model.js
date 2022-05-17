import {  createRethinkClient} from "../lib/rethink.js"

const r = createRethinkClient()

export const createUserModel = (databaseName, tableName, insert_params) => {
    return r.db(databaseName)
    .table(tableName)
    .insert(insert_params)
    .run()
}

export const getAllUsersModel = (databaseName,tableName) => {
    return r.db(databaseName)
      .table(tableName)
      .orderBy(r.desc("id"))
      .run()
}

export const getUserByIdModel = (databaseName, tableName, user_id) => {
    return r.db(databaseName)
      .table(tableName)
      .get(user_id)
      .run()
}

export const updateUserModel = (databaseName, tableName, user_id, update_params) => {
    return r.db(databaseName)
      .table(tableName)
      .get(user_id)
      .update(
        update_params
      )
      .run()
}

export const deleteUserModel = (databaseName, tableName, user_id) => {
    return r.db(databaseName)
      .table(tableName)
      .get(user_id)
      .delete()
      .run()
  
}

export const filterUserModel = (databaseName, tableName, filter_params) => {
   return r.db(databaseName)
  .table(tableName)
  .filter(filter_params)
  .run()
}