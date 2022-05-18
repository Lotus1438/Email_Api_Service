import { createRethinkClient } from "../lib/rethink.js";

const r = createRethinkClient();

//create
export const create = (databaseName, tableName, insert_params) => {
  return r.db(databaseName).table(tableName).insert(insert_params).run();
};

//inbox
// export const inbox = (databaseName, tableName) => {
//   return r
//     .db(databaseName)
//     .table(tableName)
//     .filter({ recipient: "john-doe@email.com" });
// };

//get all
export const getAll = (databaseName, tableName) => {
  return r.db(databaseName).table(tableName).orderBy(r.desc("id")).run();
};

//get by id
export const getById = (databaseName, tableName, user_id) => {
  return r.db(databaseName).table(tableName).get(user_id).run();
};

//update
export const updateById = (databaseName, tableName, user_id, update_params) => {
  return r
    .db(databaseName)
    .table(tableName)
    .get(user_id)
    .update(update_params)
    .run();
};

//delete
export const deleteById = (databaseName, tableName, user_id) => {
  return r.db(databaseName).table(tableName).get(user_id).delete().run();
};

//filter
export const getByFilter = (databaseName, tableName, filter_params) => {
  return r.db(databaseName).table(tableName).filter(filter_params).run();
};
