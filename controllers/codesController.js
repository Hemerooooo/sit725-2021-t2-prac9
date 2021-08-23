const services = require("../services");
let Service = require("../services");

const getCodes = (res) => {
    console.log('controller ')
    Service.codeService.getAllCodes(res);
}

const createCode = (data, res) => {
    Service.codeService.insertCode(data,res)
}

module.exports = {
    getCodes, createCode
}