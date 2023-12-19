const getStart = (req, res) => {
    let respuesta = {error: false, codigo: 400, message: "Funciona!"}
    res.send(respuesta)
}

module.exports = {getStart}