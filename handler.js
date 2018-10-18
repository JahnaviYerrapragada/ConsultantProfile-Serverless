'use Strict';

const databaseManager = require('./dataBaseManager');
const uuidv1 = require('uuid/v1');


function createResponse(statusCode , message){
   console.log("in response");
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

module.exports.saveItem = async(event, context) => {
    event.itemId = uuidv1();
    try{
        const response = await databaseManager.saveItem(event);
        return createResponse(200,response);
    }  catch (error){
        return createErrorResponse(400,event,error,"Unable to save the Item");
    } 
};

module.exports.getItem = async(event, context) => {
    const itemId = event.pathParameters.itemId;
    try{
      const response = await  databaseManager.getItem(itemId);
      return createResponse(200,response);
    } catch(error){
       return createErrorResponse(400,itemId,error,"Unable to Fetch the Item");
    }  
};

module.exports.deleteItem = async(event, context) => {
    const itemId = event.pathParameters.itemId;
    try {
      const response = await databaseManager.deleteItem(itemId);
      return createResponse(200,"Deleted the record with ItemId: "+itemId);
    }catch(error){
      return createErrorResponse(400,itemId,error,"Delete Item Failed");
    } 
};

module.exports.updateItem = async(event, context) => {
    const itemId = event.pathParameters.itemId;
    const body = JSON.parse(event.body);
    const paramName = body.paramName;
    const paramValue = body.paramValue;
   try{
     const response = await databaseManager.updateItem(itemId,paramName,paramValue);
     return createResponse(200,response);
   }catch(error){
     return createErrorResponse(400,body,error,"Unable to update the Item");
   }
};
