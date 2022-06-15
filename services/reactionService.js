const SqlServerLib = require('../lib/postgresdb');
const dateUtils = require('../util/dates/dateUtils');

class ReactionService {
    constructor() {
        this.sqlServerLib = new SqlServerLib();
    }

    async getByPublication({ idPublication }, { id: idAccount }) {
        const sql = `select *
                     from public."Reactions"
                     where "idPublication" = '${idPublication}' and "idAccount" = '${idAccount}';`

        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        return result;
    }

    async create({ idPublication, idTypeReaction }, { id: idAccount }) {
        const sql = `insert into "Reactions"(
                    "idPublication", "idAccount", "idTypeReaction", date, "isActive")
                     values ('${idPublication}', '${idAccount}', '${idTypeReaction}', '${dateUtils.getFecha()}', B'${1}')
                     returning *;`;
        const result = await this.sqlServerLib.executeSqlAsync(sql);
        console.log(result);
        return result;
    }

    async update({ idPublication, idTypeReaction, like }, { id: idAccount }) {
        const sql = `update "Reactions"
                     set date='${dateUtils.getFecha()}', "isActive"=B'${like}'
                     where "idPublication" = '${idPublication}' and "idAccount" = '${idAccount}'
                     returning *;`;
        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        console.log(result);
        return result;
    }
}

module.exports = ReactionService;