'use strict';
const { User } = require('../app/models');
const utils = require('../utils/userUtils')

module.exports.getUsers = async function (req, res) {
    const users = await User.findAll();
    res.json(users);
}

module.exports.getUser = async function (req, res) {
    let id = req.params.id;
    const user = await User.findByPk(id);
    res.json(user);
}

module.exports.postUser = async function (req, res) {
    const user = await User.create(req.body);
    res.json(user);
}

module.exports.putUser = async function (req, res) {
    let params = req.body;
    const user = await User.findByPk(params.id);

    if (params.name) user.name = params.name;
    if (params.email) user.email = params.email;

    const resultadoSave = await user.save();
    res.json(resultadoSave);
}

module.exports.putUsers = async function (req, res) {
    let users = req.body;
    let result = await users.map(user => { return utils.massivePut(user) });
    res.json(result);
}

module.exports.deleteUser = async function (req, res) {
    let id = req.params.id;
    let user = await User.findByPk(id);
    await utils.storeDelete(user);
    user.destroy();
    res.status(200).send('Deletado');
}

module.exports.destroyUsers = async function (req, res) {
    const ids = req.body;
    let result = await ids.map(id => { return utils.massiveDelete(id) });
    res.status(200).send('Deletados');
}