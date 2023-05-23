const _ = require("lodash");

// Only enter object name & [fieldName1, fieldName2]
const getInfoData = (object = {}, fields = []) => _.pick(object, fields);

module.exports = { getInfoData };
