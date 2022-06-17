const SqlServerLib = require("../lib/postgresdb");
const dateUtils = require("../util/dates/dateUtils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginService {
  constructor() {
    this.sqlServerLib = new SqlServerLib();
  }

  async authenticate(
    { password: formPassword },
    { id: idUser, password: passwordDB }
  ) {
    if (bcrypt.compareSync(formPassword, passwordDB)) {
      const token = jwt.sign({ sub: idUser }, process.env.TOKEN_KEY, {
        expiresIn: "7d",
      });
      return token;
    }
  }

  async getUser({ email }) {
    const sql = `select * from "Accounts" where email = '${email}';`;
    const [result] = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }

  async getUserById({ sub: idAccount }) {
    const sql = `select * from "Accounts" where id = '${idAccount}';`;
    const [result] = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }

  async createUser({ email, password }) {
    const passwordCrypt = bcrypt.hashSync(password, 10);
    const sql = `insert into "Accounts"(
                        email, password, date, "isActive")
                        values ('${email}', '${passwordCrypt}', '${dateUtils.getFecha()}', B'${1}')
                        returning *;`;
    const [result] = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }

  async saveToken({ id: idAccount }, token) {
    const sql = `update "Accounts" set token='${token}' where id='${idAccount}'
        returning *;`;
    const [result] = await this.sqlServerLib.executeSqlAsync(sql);
    return result;
  }
}

module.exports = LoginService;
