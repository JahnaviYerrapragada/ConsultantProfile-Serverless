'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Table_Name = process.env.CONSULTANT_TABLE;

module.exports.saveItem = async(item) => {
    const params ={
        TableName: Table_Name,
        Item: item
    };
    return await dynamoDB.put(params)
    .then(() => {
        return item.itemId;
    });
};

module.exports.getItem = async(itemId) => {
   const params = {
       Key: {
           itemId: itemId
       },
       TableName: Table_Name
   };
    return await dynamoDB.get(params)
    .then(result => {
        return result.Item;
    });
};

module.exports.deleteItem = async(itemId) => {
    const params = {
        Key: {
            itemId: itemId
        },
        TableName: Table_Name
    };
     return await dynamoDB.delete(params);
 };

 
 module.exports.updateItem = (itemId,paramName,paramValue) => {
  
    const params = {
        Key: {
            itemId
        },
        TableName: Table_Name,
        ConditionExpression: 'attribute_exists(itemId)',
        UpdateExpression: 'set ' + paramName + ' = :v',
        ExpressionAttributeValues: {
            ':v': paramValue
        },
        ReturnValues: 'ALL_NEW'
    };
    return dynamoDB.update(params)
       .then(response =>{
        return response.Attributes;
    });
 };
