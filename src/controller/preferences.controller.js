const { pool } = require("../database");

const getPreferences = async (req, res) => {
    try {
        let [result] = await pool.query(`SELECT id_category, title FROM hirun.user_pref AS uspr JOIN hirun.category AS cat ON (uspr.category = cat.id_category) WHERE uspr.user = ${req.query.id_user}`)
        let answer = { error: false, code: 200, message: "OK", data: result };
        res.send(answer);
    } catch (err) {
        console.log(err)
        res.send({ error: true, code: 0, message: "Se ha producido un error" })
    }
}

const postPreferences = async (req, res) => {
    try {
        let params = []
        let query = ""
        req.body.forEach(element => {
            params.push(element.id_category)
            query += `INSERT INTO hirun.user_pref (user, category) VALUES (${req.query.id_user}, ?);`
        });
        let [result] = await pool.query(query, params)
        let answer = { error: false, code: 200, message: "OK" };
        res.send(answer);
    } catch (err) {
        console.log(err)
        res.send({ error: true, code: 0, message: "Se ha producido un error" })
    }
}

const putPreferences = async (req, res) => {
    try {
        let [result1] = await pool.query(`DELETE FROM hirun.user_pref WHERE user = ${req.query.id_user}`)
        let params = []
        let query = ""
        req.body.forEach(element => {
            params.push(element.id_category)
            query += `INSERT INTO hirun.user_pref (user, category) VALUES (${req.query.id_user}, ?);`
        });
        let [result2] = await pool.query(query, params)
        // let [result3] = await pool.query(`SELECT id_category, title FROM hirun.user_pref AS uspr JOIN hirun.category AS cat ON (uspr.category = cat.id_category) WHERE uspr.user = ${req.query.id_user}`)
        let answer = { error: false, code: 200, message: "OK" };
        res.send(answer);
    } catch (err) {
        console.log(err)
        res.send({ error: true, code: 0, message: "Se ha producido un error" })
    }
}

module.exports = { getPreferences, putPreferences, postPreferences };
