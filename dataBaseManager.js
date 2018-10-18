'use strict';

const AWS = require('aws-sdk');
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

module.exports.getItem = async(itemId) => {
    const params = {
        Key: {
            itemId: itemId
        },
        TableName: Table_Name
    };
     return await dynamoDB.get(params).promise()
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
     return await dynamoDB.delete(params).promise();
 };

 
 module.exports.updateItem =async (itemId,paramName,paramValue) => {
  
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
    return dynamoDB.update(params).promise()
    .then(response =>{
        return response.Attributes;
    });
 };
