const { Pool } = require('pg');
const { dbConfig } = require("../config");
const chalk = require('chalk');


class PostgresServerLib {
    constructor() { }

    executeSqlAsync = async (sql) => {
        console.log(chalk.yellow("\nsql:\n", sql));

        try {
            const pool = new Pool(dbConfig);
            const result = await pool.query(sql);

            return result.rows;

        } catch (err) {

        }
    }
}

module.exports = PostgresServerLib;


