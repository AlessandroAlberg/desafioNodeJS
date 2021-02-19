const { Deleted, sequelize } = require('../app/models'); 
const { User } = require('../app/models');
const Sequelize = require('sequelize');

async function storeDelete(user) {
    return await Deleted.create({
        userId: user.id,
        name: user.name,
        email: user.email
    });
}

async function massivePut(param) {
    const user = await User.findByPk(param.id);

    if (param.name) user.name = param.name;
    if (param.email) user.email = param.email;

    const resultadoSave = await user.save();
    return resultadoSave;
}

async function massiveDelete(param) {
    let user = await User.findByPk(param.id);
    await storeDelete(user);
    user.destroy();
}

async function clearCache() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    mes < 10 ? mes = '0' + (mes + 1) : mes = (mes + 1);
    var ano = data.getFullYear();
    var today = ano + '-' + mes + '-' + dia;  
    sequelize.query(
        "DELETE FROM Deleteds WHERE createdAt < ?", {
            replacements: [today],
            type: sequelize.QueryTypes.DELETE
        }
    )
}

module.exports = {storeDelete, massiveDelete, massivePut, clearCache}