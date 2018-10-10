'use strict';

module.exports.delete = (event, context, callback) => {

  const params = {
        TableName: process.env.CANDIDATE_TABLE,
        Key: {
          id: event.pathParameters.id,
       },
    };
  dynamoDb.delete(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t delete candidate.'));
      return;
    });

};