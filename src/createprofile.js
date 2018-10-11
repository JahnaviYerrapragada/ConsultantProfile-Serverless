'use strict';

const AWS = require('aws-sdk'); 



const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.insert = (event, context, callback) => {
console.log("Request received :\n",JSON.stringify(event));
console.log("Request received :\n",JSON.stringify(context));

const tableName = "";
dynamoDb.putItem({
    "TableName" : tableName,
    "Item" : {
        "name":{
            "s":event.name
        },
        "id":{
            "N":event.id
        }
    }
},function(err,data){
    if(err){
        context.fail('hello......'+err)
    } else {
        console.log(JSON.stringify(data,null,''));
    }
}
);

}