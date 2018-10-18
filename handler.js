'use Strict'

const databaseManager = require('./dataBaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode , message){
    return{
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
}

function createErrorResponse(statusCode , data, error,message){
    return{
        statusCode: statusCode,
        body: JSON.stringify(message),
        items: data,
        error: error
    };
}

module.exports.saveItem = async (event, context) => {
    const item = JSON.parse(event.body);
    item.itemId = uuidv1();
    try{
        const response = await databaseManager.saveItem(item);
        createResponse(200,response);
    }  catch (error){
        createResponse(400,item,error,"Unable to save the Item");
    } 
};

module.exports.getItem = async (event, context) => {
    const itemId = event.pathParameters.itemId;
    try{
      const response = await  databaseManager.getItem(itemId);
      createResponse(200,response);
    } catch(error){
       createResponse(400,item,error,"Unable to Fetch the Item");
    }  
};

module.exports.deleteItem = (event, context) => {
    const itemId = event.pathParameters.itemId;
    try {
        const response = await databaseManager.deleteItem(itemId);
        createResponse(200,response);
    }catch(error){
        createResponse(400,item,error,"Delete Item Failed");
    } 
};

module.exports.updateItem = (event, context) => {
    const itemId = event.pathParameters.itemId;
    const body = JSON.parse(event.body);
    const paramName = body.paramName;
    const paramValue = body.paramValue;
   try{
          const response = await databaseManager.updateItem(itemId,paramName,paramValue);
          createResponse(200,response);
   }catch(error){
          createResponse(400,item,error,"Unable to update the Item");
   }s   
};
