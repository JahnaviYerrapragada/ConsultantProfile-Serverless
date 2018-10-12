'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Table_Name = process.env.CONSULTANT_TABLE;

module.exports.saveItem = item => {
    const params ={
        TableName: Table_Name,
        Item: item
    };
    return dynamoDB.put(params).promise().then(() => {
        return item.itemId;
    });
};

module.exports.getItem = itemId => {
   const params = {
       Key: {
           itemId: itemId
       },
       TableName: Table_Name
   };
    return dynamoDB.get(params).promise().then(result => {
        return result.Item;
    });
};

module.exports.deleteItem = itemId => {
    const params = {
        Key: {
            itemId: itemId
        },
        TableName: Table_Name
    };
     return dynamoDB.delete(params).promise();
 };

 module.exports.updateItem = (itemId,paramsName,paramsValue) => {
   const timestamp = new Date().getTime();
   
    const params = {
        Key: {
            itemId
        },
        TableName: Table_Name,
        ConditionExpression: 'attribute_exists(itemId)',
        UpdateExpression: 'set ' + paramsName + ' = :v',
        ExpressionAttributeValues: {
            ':v': paramsValue
        },
        ReturnValues: 'ALL_NEW'
    };
     return dynamoDB.update(params, (error, result) => {
         if(error){
            console.error("***************************************"+error);
            const response = {
                "statusCode":200,
                 "headers":{
                  "some-header":"some header value"
                            },
                "body":"{\"ErrorMessage\":\"Failed to update\"}"
               };
            return response;
        }
         

        const response = {
            "statusCode":200,
             "headers":{
              "some-header":"some header value"
                        },
            "body": JSON.stringify(result.Item)
           };
   return response;
    });
 };