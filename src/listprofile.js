'use strict';

const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.listall = (event, context, callback) => {

  console.log('tot', event, 'tot1')

  const timestamp = new Date().getTime();

  const { fullname, email, experience } = event;
  
  let params = {};

  if ( fullname && email && experience ) {
    
    params = {
      TableName: process.env.CONSULTANT_TABLE,
      Item: {
        fullname,
        email,
        experience,
      },
    };

  } else {
    
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'required params not found, (need: fullname, email & experience)',
    })

  }

  dynamoDB.scan(params, (err) => {
    
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