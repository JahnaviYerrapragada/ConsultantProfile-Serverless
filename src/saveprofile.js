'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.CONSULTANT_TABLE;

module.exports.save = (event, context, callback) => {
  console.log('tot', event, 'tot1')
  const timestamp = new Date().getTime();
  const { fullname, email, experience } = event;
  
  let params = {};

  if ( fullname && email && experience ) {
    
    params = {
      TableName: tableName,
      Key: {
        fullname
      },
      ConditionExpression: 'attribute_exists(fullname)',
      UpdateExpression: 'set' + Fullname + ' = :v,'+ Email+' =:e,'+ Experience+' = :y',
      ExpressionAttributeValues: {
       ':v' : fullname,
       ':e' : email,
       ':y' : experience
      },
      ReturnValues: 'ALL_NEW'
    };

  } else {
    
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'required params not found, (need: fullname, email & experience)',
    })

  }

  dynamoDB.update(params, (err) => {
    
    if (err) {
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: {
          msg: 'error',
          err,
        },
      })
      return;
    }

    const response ={
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

    callback(null, response);

  });

}