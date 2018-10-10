'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.insert = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const fullname = requestBody.fullname;
  const email = requestBody.email;
  const experience = requestBody.experience;

  if (typeof fullname !== 'string' || typeof email !== 'string' || typeof experience !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit candidate because of validation errors.'));
    return;
  }
  insertCandidateP(candidateInfo(fullname, email, experience))
  .then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully submitted candidate with email ${email}`,
        candidateId: res.id
      })
    });
  })
  .catch(err => {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to submit candidate with email ${email}`
      })
    })
  });
};
const insertCandidateP = candidate => {
    console.log('Submitting candidate');
    const candidateInfo = {
      TableName: process.env.CANDIDATE_TABLE,
      Item: candidate,
    };
    return dynamoDb.put(candidateInfo).promise()
      .then(res => candidate);
  };
  
  const candidateInfo = (fullname, email, experience) => {
    const timestamp = new Date().getTime();
    return {
      fullname: fullname,
      email: email,
      experience: experience,
      submittedAt: timestamp,
      updatedAt: timestamp,
    };
  };