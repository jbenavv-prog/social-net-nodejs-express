const SqlServerLib = require('../lib/postgresdb');
const dateUtils = require('../util/dates/dateUtils');

class CommentService {
    constructor() {
        this.sqlServerLib = new SqlServerLib();
    }

    // async getByPublication({ idPublication }, { id: idAccount }) {
    //     const sql = `select *
    //                  from public."Reactions"
    //                  where "idPublication" = '${idPublication}' and "idAccount" = '${idAccount}';`

    //     const [result] = await this.sqlServerLib.executeSqlAsync(sql);
    //     return result;
    // }

    async create({ idPublication, description }, { id: idAccount }) {
        const sql = `insert into "Comments"(
                    "idAccount", "idPublication", description, date, "isActive")
                     values ('${idAccount}', '${idPublication}', '${description}', '${dateUtils.getFecha()}', B'${1}')
                     returning *;`;
        const result = await this.sqlServerLib.executeSqlAsync(sql);
        console.log(result);
        return result;
    }

    async update({ idPublication, idComment }, { id: idAccount }) {
        const sql = `update "Comments"
                     set date='${dateUtils.getFecha()}', "isActive"=B'${0}'
                     where id = 'idComment'   
                     returning *;`;
        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        console.log(result);
        return result;
    }
}

module.exports = CommentService;