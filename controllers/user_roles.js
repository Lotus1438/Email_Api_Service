import { createRethinkClient } from "../lib/rethink.js";

var databaseName = "mydb";
var tableName = "users";
const r = createRethinkClient();

// export const userRoles = (req, res) => {
//     let role =  {
//         super_admin: 'super_admin',
//         normal_user: 'normal_super'
//     }
// }

export const authorize = async (req, res, next) => {
    const apiToken = req.headers['cookie'];
    
    req.user = await r.databaseName.tableName.findByApiKey(apiToken);
      console.log(apiToken);
    next();
  }
  
export const permit = (...permittedRoles)=> {
    
    return (req, res, next) => {
      const { user } = req
  
      if (user && permittedRoles.includes(user.role)) {
        next();
      } else {
        res.status(403).json({message: "Forbidden"});
      }
    }
  }

export const loadDb = (req, res, next) => {
  
    req.databaseName = {
      tableName: {
        findByApiKey: async token => {
            if (token == '1') return {role:'super_admin', id:'1'}

            if (token == '2') return {role:'nomral_user', id: '2'}

    },
  },
}
next();
}