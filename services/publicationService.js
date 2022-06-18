const SqlServerLib = require("../lib/postgresdb");
const dateUtils = require("../util/dates/dateUtils");

class PublicationService {
  constructor() {
    this.sqlServerLib = new SqlServerLib();
  }

  async create({ user, idTypePublication, description }, imageURL) {
    user = JSON.parse(user);
    const idAccount = user.id;
    console.log(user);
    const sql = `insert into "Publications"(
            "idAccount", description, "imageURL", date, "idTypePublication", "isActive")
            values ('${idAccount}', '${description}', '${imageURL}', '${dateUtils.getFecha()}', '${idTypePublication}', B'${1}')
            returning *;`;
    const [result] = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }

  async getPublications() {
    const sql = `select a.id as "idPublication",
        a.description,
        a."imageURL",
        a.date, a."idTypePublication",
        a."idAccount",
        b."fullName",
        b."photoProfileURL",
        (select count(*)::int from "Reactions" c where c."idPublication" = a.id and c."isActive" = '1') as likes,
		(select array(select "idAccount" from "Reactions" d where d."idPublication" = a.id and d."isActive" = '1')) as "idAccountsWhoLiked",
		(select array_to_json(array_agg(row_to_json(t))) from (select com.*, pro."fullName", pro."photoProfileURL" from "Comments" com, "Profiles" pro where com."idPublication" = a.id and com."idAccount" = pro."idAccount" order by com.id desc) t) as "comments" 
        from "Publications" a, "Profiles" b
        where a."idAccount" = b."idAccount"
        order by "idPublication" desc;`;
    const result = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }

  async getPublicationsByUser({ id: idAccount }) {
    const sql = `select a.id as "idPublication",
        a.description,
        a."imageURL",
        a.date, a."idTypePublication",
        a."idAccount",
        b."fullName",
        b."photoProfileURL",
        (select count(*)::int from "Reactions" c where c."idPublication" = a.id and c."isActive" = '1') as likes,
		(select array(select "idAccount" from "Reactions" d where d."idPublication" = a.id and d."isActive" = '1')) as "idAccountsWhoLiked",
		(select array_to_json(array_agg(row_to_json(t))) from (select com.*, pro."fullName", pro."photoProfileURL" from "Comments" com, "Profiles" pro where com."idPublication" = a.id and com."idAccount" = pro."idAccount" order by com.id desc) t) as "comments" 
        from "Publications" a, "Profiles" b
        where a."idAccount" = b."idAccount" and a."idAccount" = '${idAccount}'
        order by "idPublication" desc;`;
    const result = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }
}

module.exports = PublicationService;
