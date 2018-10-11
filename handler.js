'use Strict'

const databaseManager = require('./dataBaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode , message){
    return{
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
}

module.exports.saveItem = (event, context, callback) => {
    const item = JSON.parse(event.body);
    console.log(item);
    item.itemId = uuidv1();

    databaseManager.saveItem(item).then(response =>{
        console.log(response);
        callback(null, createResponse(200,response));
    });   
};

module.exports.getItem = (event, context, callback) => {
    const itemId = event.pathParameters.itemId;
    databaseManager.getItem(itemId).then(response =>{
        console.log(response);
        callback(null, createResponse(200,response));
    });   
};

module.exports.deleteItem = (event, context, callback) => {
    const itemId = event.pathParameters.itemId;
    databaseManager.deleteItem(itemId).then(response =>{
        console.log(response);
        callback(null, createResponse(200,'Deleted the Item'));
    });   
};


module.exports.updateItem = (event, context, callback) => {
    const itemId = event.pathParameters.itemId;
    const body = JSON.parse(event.body);
    const paramName = body.paramName;
    const ParamValue = body.paramValue;
    databaseManager.updateItem(itemId,paramName,ParamValue).then(response =>{
        console.log(response);
        callback(null, createResponse(200,response));
    });   
};