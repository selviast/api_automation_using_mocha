const fs = require("fs");

function readJsonSchema(schemaName){
    const schemaFolder = "/Users/selvia/api_automation_using_mocha/test/resource/schema";
    return JSON.parse(fs.readFileSync(`${schemaFolder}/${schemaName}`, 'utf8'));

}

module.exports = readJsonSchema;