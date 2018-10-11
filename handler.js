'use Strict'

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode , message){
    return{
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
}

module.export.saveItem = (event, context, caallback) => {
    const item = JSON.parse(event.body);
    console.log(item);
    item.itemId = uuidv1();

    databaseManager.saveItem(item).then(response =>{
        console.log(response);
        callback(null, createResponse(200,message));
    });   
};

module.export.getItem = (event, context, caallback) => {
    const itemId = event.pathParameters.itemId;
    databaseManager.getItem(itemId).then(response =>{
        console.log(response);
        callback(null, createResponse(200,message));
    });   
};

module.export.deleteItem = (event, context, caallback) => {
    const itemId = event.pathParameters.itemId;
    databaseManager.deleteItem(itemId).then(response =>{
        console.log(response);
        callback(null, createResponse(200,'Deleted the Item'));
    });   
};


module.export.updateItem = (event, context, caallback) => {
    const itemId = event.pathParameters.itemId;
    const body = JSON.parse(event.body);
    const paramName = body.paramName;
    const ParamValue = body.paramValue;
    databaseManager.updateItem(itemId).then(response =>{
        console.log(response);
        callback(null, createResponse(200,response));
    });   
};