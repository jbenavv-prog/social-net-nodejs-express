const SqlServerLib = require('../lib/postgresdb');
const dateUtils = require('../util/dates/dateUtils');

class ProfileService {
    constructor() {
        this.sqlServerLib = new SqlServerLib();
    }

    async create(idAccount, { fullName }) {
        const sql = `insert into "Profiles"(
            "idAccount", "fullName", date, "isActive")
            values ('${idAccount}', '${fullName}', '${dateUtils.getFecha()}', B'${1}')
            returning *;`;
        const result = await this.sqlServerLib.executeSqlAsync(sql);
        return result;
    }

    async getByUser({ id: idAccount }) {
        const sql = `select * from "Profiles" where "idAccount" = '${idAccount}';`;
        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        return result;
    }

    async getByUserSub({ sub: idAccount }) {
        const sql = `select * from "Profiles" where "idAccount" = '${idAccount}';`;
        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        return result;
    }


    async updatePhotoProfile(photoProfileURL, { id: idAccount }) {
        const sql = `update "Profiles"
        SET "photoProfileURL"='${photoProfileURL}'
        WHERE "idAccount"='${idAccount}'
        returning *;`
        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        return result;
    }

    async updateDetails({ phone, location, college }, { id: idAccount }) {
        const sql = `update "Profiles"
        set phone='${phone}', location='${location}', college='${college}', date='${dateUtils.getFecha()}'
        where "idAccount" = '${idAccount}'
        returning *;`
        const [result] = await this.sqlServerLib.executeSqlAsync(sql);
        return result;
    }
}

module.exports = ProfileService;