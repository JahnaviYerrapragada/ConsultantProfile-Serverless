'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.insert = (event, context, callback) => {

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
}