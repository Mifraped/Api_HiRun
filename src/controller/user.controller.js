const {connection} = require('../database')

const getStart = (req, res) => {
    let respuesta = {error: false, codigo: 400, message: "Funciona!"}
    res.send(respuesta)
}

const loginUser = async (req, res) => {
    try{
        let params = [req.body.email, req.body.password]
        let sql = "SELECT id_user, email, name, surname, location, phonenumber, photo, company FROM hirun.user WHERE email = ? AND password = ?"
        let [result] = await pool.query(sql, params)
        let resultado = result[0]
        let respuesta
        if(result.length > 0){
            respuesta = {error: false, codigo: 200, message: "Datos correctos", data: resultado}
        }else{
            respuesta = {error: true, codigo: 200, message: "Datos incorrectos"}
        }
        res.send(respuesta)
    }catch(error){
        console.log(error)
    }
}

module.exports = {getStart, loginUser}